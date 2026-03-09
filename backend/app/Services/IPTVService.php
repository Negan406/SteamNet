<?php

namespace App\Services;

use App\Models\IptvAccount;
use Exception;

class IPTVService
{
    /**
     * Assign an available IPTV account to the user.
     */
    public function provisionAccount($user, $package)
    {
        // Find an available account matching the package category
        $account = IptvAccount::where('status', 'available')
                              ->where('category', $package->category)
                              ->first();

        if (!$account) {
            throw new Exception("No available {$package->category} IPTV accounts at the moment. Please contact support.");
        }

        // Assign to user
        $account->update([
            'status' => 'sold',
            'user_id' => $user->id,
            'expire_date' => now()->addDays($package->duration_days)
        ]);

        return $account;
    }

    /**
     * Mock function to suspend IPTV account.
     */
    public function suspendAccount($subscription)
    {
        // Mock API call to disable line
        return true;
    }
}
