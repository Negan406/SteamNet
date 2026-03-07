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
        protected IPTVService $iptvService
    ) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'package_id' => 'required|exists:packages,id',
            'payment_method' => 'required|string',
        ]);

        $package = Package::findOrFail($validated['package_id']);
        $user = $request->user();

        // Simulate payment
        $paymentStatus = $this->paymentService->processPayment($user, $package->price, $validated['payment_method']);

        if (!$paymentStatus) {
            return response()->json(['message' => 'Payment failed'], 400);
        }

        // Create Order
        $order = Order::create([
            'user_id' => $user->id,
            'package_id' => $package->id,
            'amount' => $package->price,
            'payment_method' => $validated['payment_method'],
            'status' => 'completed',
        ]);

        // Provision IPTV Account
        $iptvAccount = $this->iptvService->provisionAccount($user, $package);

        // Create Subscription
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'package_id' => $package->id,
            'start_date' => now(),
            'end_date' => now()->addDays($package->duration_days),
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order,
            'subscription' => $subscription,
            'iptv_account' => $iptvAccount
        ], 201);
    }

    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('package')->get();
        return response()->json($orders);
    }
}
