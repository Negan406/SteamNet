<?php

namespace App\Services;

class PaymentService
{
    public function processPayment($user, $amount, $method)
    {
        // Mock payment logic
        // Instant payments
        if (in_array($method, ['paypal', 'credit_card'])) {
            return 'completed';
        }

        // Manual approval payments
        if (in_array($method, ['crypto', 'bank_transfer'])) {
            return 'pending';
        }

        return false;
    }
}
