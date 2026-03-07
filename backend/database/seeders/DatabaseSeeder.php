<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Package;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Regular User
        User::create([
            'name' => 'Test User',
            'email' => 'user@user.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Packages
        Package::create([
            'name' => 'Basic Plan',
            'description' => '1 Month IPTV Access with 10k channels.',
            'price' => 10.00,
            'duration_days' => 30,
            'is_active' => true,
        ]);

        Package::create([
            'name' => 'Pro Plan',
            'description' => '6 Months IPTV Access with 20k channels + VOD.',
            'price' => 50.00,
            'duration_days' => 180,
            'is_active' => true,
        ]);

        Package::create([
            'name' => 'Premium Plan',
            'description' => '12 Months IPTV Access with all channels.',
            'price' => 80.00,
            'duration_days' => 365,
            'is_active' => true,
        ]);
    }
}
