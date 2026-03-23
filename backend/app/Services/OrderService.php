<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Package;
use App\Models\Subscription;
use App\Models\User;
use App\Services\IPTVService;
use App\Services\NetflixService;

class OrderService
{
    public function __construct(
        protected IPTVService $iptvService,
        protected NetflixService $netflixService
    ) {}

    /**
     * Fulfill an order: provision account and create subscription.
     */
    public function fulfill(Order $order)
    {
        if ($order->status === 'completed') {
            return $order;
        }

        $user = $order->user;
        $package = $order->package;

        // Provision Account
        if ($package->type === 'netflix') {
            $account = $this->netflixService->provisionAccount($user, $package);
        } else {
            $account = $this->iptvService->provisionAccount($user, $package);
        }

        // Create Subscription
        Subscription::create([
            'user_id' => $user->id,
            'package_id' => $package->id,
            'start_date' => now(),
            'end_date' => now()->addDays($package->duration_days),
            'status' => 'active',
        ]);

        $order->update(['status' => 'completed']);

        return [
            'order' => $order,
            'account' => $account
        ];
    }
}
