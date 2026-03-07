<?php

namespace App\Services;

class IPTVService
{
    /**
     * Mock function to provision IPTV.
     */
    public function provisionAccount($user, $package)
    {
        // In a real application, this would make an API call to an Xtream UI panel, etc.
        return [
            'username' => 'user_' . $user->id . '_' . rand(1000, 9999),
            'password' => bin2hex(random_bytes(4)),
            'server_url' => 'http://iptv-server.mock:8080',
            'status' => 'success'
        ];
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
