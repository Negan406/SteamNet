<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;
use App\Models\NetflixAccount;

class NetflixSeeder extends Seeder
{
    public function run()
    {
        // Sample Netflix Packages
        $packages = [
            [
                'name' => 'Netflix Basic',
                'type' => 'netflix',
                'description' => '1 Screen, SD Quality, Unlimited Movies.',
                'price' => 7.99,
                'duration_days' => 30,
                'category' => 'Basic',
                'is_active' => true,
            ],
            [
                'name' => 'Netflix Standard',
                'type' => 'netflix',
                'description' => '2 Screens, HD Quality, Ad-free.',
                'price' => 12.99,
                'duration_days' => 30,
                'category' => 'Standard',
                'is_active' => true,
            ],
            [
                'name' => 'Netflix Premium (4K)',
                'type' => 'netflix',
                'description' => '4 Screens, Ultra HD + HDR, Premium Sound.',
                'price' => 19.99,
                'duration_days' => 30,
                'category' => 'Premium',
                'is_active' => true,
            ],
        ];

        foreach ($packages as $pkg) {
            Package::create($pkg);
        }

        // Sample Available Netflix Accounts
        $accounts = [
            [
                'email' => 'stream-basic1@demo.com',
                'password' => 'Pass123!',
                'profile_name' => 'John',
                'pin' => '1234',
                'category' => 'Basic',
                'status' => 'available',
            ],
            [
                'email' => 'stream-premium1@demo.com',
                'password' => 'Secure88!',
                'profile_name' => 'Family',
                'pin' => '0000',
                'category' => 'Premium',
                'status' => 'available',
            ],
            [
                'email' => 'stream-premium2@demo.com',
                'password' => 'MovieNight!',
                'profile_name' => 'Sarah',
                'pin' => '9999',
                'category' => 'Premium',
                'status' => 'available',
            ],
        ];

        foreach ($accounts as $acc) {
            NetflixAccount::create($acc);
        }
    }
}
