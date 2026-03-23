<?php

namespace App\Services;

use App\Models\NetflixAccount;
use Exception;

class NetflixService
{
    /**
     * Assign an available Netflix account to the user.
     */
    public function provisionAccount($user, $package)
    {
        // Find an available account matching the package category
        $account = NetflixAccount::where('status', 'available')
                                ->where('category', $package->category)
                                ->first();

        if (!$account) {
            throw new Exception("No available {$package->category} Netflix accounts at the moment. Please contact support.");
        }

        // Assign to user
        $account->update([
            'status' => 'sold',
            'user_id' => $user->id,
            'expire_date' => now()->addDays($package->duration_days)
        ]);

        return $account;
    }
}
