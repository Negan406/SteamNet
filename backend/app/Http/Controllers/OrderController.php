<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Package;
use App\Models\Subscription;
use App\Services\PaymentService;
use App\Services\IPTVService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(
        protected PaymentService $paymentService,
        protected \App\Services\OrderService $orderService,
        protected \App\Services\CmiService $cmiService
    ) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'package_id' => 'required|exists:packages,id',
            'payment_method' => 'required|string',
        ]);

        $package = Package::findOrFail($validated['package_id']);
        $user = $request->user();

        // Process payment
        if ($validated['payment_method'] === 'cmi') {
            $order = Order::create([
                'user_id' => $user->id,
                'package_id' => $package->id,
                'amount' => $package->price,
                'payment_method' => 'cmi',
                'status' => 'pending',
            ]);

            $redirectData = $this->cmiService->prepareParameters(
                $order,
                $user,
                url('/api/cmi/success'),
                url('/api/cmi/failure'),
                url('/api/cmi/callback')
            );

            return response()->json([
                'message' => 'Redirecting to CMI...',
                'payment_url' => $redirectData['url'],
                'payment_params' => $redirectData['params']
            ], 200);
        }

        $paymentStatus = $this->paymentService->processPayment($user, $package->price, $validated['payment_method']);

        if (!$paymentStatus) {
            return response()->json(['message' => 'Payment failed or method not supported'], 400);
        }

        // Create Order
        $order = Order::create([
            'user_id' => $user->id,
            'package_id' => $package->id,
            'amount' => $package->price,
            'payment_method' => $validated['payment_method'],
            'status' => $paymentStatus,
        ]);

        // If payment is instant, fulfill immediately
        if ($paymentStatus === 'completed') {
            try {
                $result = $this->orderService->fulfill($order);
                return response()->json([
                    'message' => 'Order placed successfully',
                    'order' => $result['order'],
                    'account' => $result['account']
                ], 201);
            } catch (\Exception $e) {
                $order->update(['status' => 'failed']);
                return response()->json(['message' => $e->getMessage()], 400);
            }
        }

        // For manual/pending payments, successfully return the order
        return response()->json([
            'message' => 'Order received. Please complete the payment to activate your account.',
            'order' => $order
        ], 201);
    }

    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('package')->get();
        return response()->json($orders);
    }
}
