<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\CmiService;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentCallbackController extends Controller
{
    public function __construct(
        protected CmiService $cmiService,
        protected OrderService $orderService
    ) {}

    /**
     * Handle CMI IPN (Instant Payment Notification)
     */
    public function handleCmiCallback(Request $request)
    {
        Log::info('CMI Callback Received', $request->all());

        if (!$this->cmiService->validateHash($request->all())) {
            Log::error('CMI Callback: Invalid Hash');
            return response('ACTION=REJECT', 400); // Standard CMI rejection response
        }

        $orderId = $request->input('oid');
        $procReturnCode = $request->input('ProcReturnCode');

        $order = Order::findOrFail($orderId);

        if ($procReturnCode === '00' && $order->status !== 'completed') {
            try {
                $this->orderService->fulfill($order);
                Log::info("Order #{$orderId} fulfilled via CMI callback.");
                return response('ACTION=APPROVE'); // Standard CMI approval response
            } catch (\Exception $e) {
                Log::error("Order Fulfillment Error: " . $e->getMessage());
                return response('ACTION=REJECT', 500);
            }
        }

        return response('ACTION=REJECT');
    }

    /**
     * Handle Success Redirect (User returns to site)
     */
    public function handleSuccess(Request $request)
    {
        return redirect()->away(env('FRONTEND_URL', 'http://localhost:5173') . '/dashboard?payment=success');
    }

    /**
     * Handle Failure Redirect
     */
    public function handleFailure(Request $request)
    {
        return redirect()->away(env('FRONTEND_URL', 'http://localhost:5173') . '/dashboard?payment=failed');
    }
}
