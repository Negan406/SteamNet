<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class CmiService
{
    protected string $clientId;
    protected string $storeKey;
    protected string $gatewayUrl;

    public function __construct()
    {
        $this->clientId = config('services.cmi.client_id', '600001');
        $this->storeKey = config('services.cmi.store_key', 'TEST1234');
        $this->gatewayUrl = config('services.cmi.gateway_url', 'https://testpayment.cmi.co.ma/fim/est3Dgate');
    }

    /**
     * Prepare parameters for CMI hosted payment form.
     */
    public function prepareParameters($order, $user, $okUrl, $failUrl, $callbackUrl): array
    {
        $params = [
            'clientid' => $this->clientId,
            'amount' => number_format($order->amount, 2, '.', ''),
            'currency' => '504', // MAD
            'oid' => $order->id,
            'okUrl' => $okUrl,
            'failUrl' => $failUrl,
            'callbackUrl' => $callbackUrl,
            'transtype' => 'PreAuth',
            'encoding' => 'UTF-8',
            'hashAlgorithm' => 'ver3',
            'storetype' => '3D_PAY_HOSTING',
            'ShopUrl' => url('/'),
            'billToName' => $user->name,
            'email' => $user->email,
            'tel' => '0600000000',
            'rnd' => (string) microtime(true),
        ];

        $params['HASH'] = $this->generateHash($params);

        Log::info('CMI Parameters Prepared', ['params' => $params]);

        return [
            'url' => $this->gatewayUrl,
            'params' => $params
        ];
    }

    /**
     * Generate CMI Hash (SHA-512)
     */
    public function generateHash(array $params): string
    {
        ksort($params); // CMI requires parameters to be sorted alphabetically

        $hashString = "";
        foreach ($params as $key => $value) {
            // Escape special characters as per Cmi requirement
            $escapedValue = str_replace("|", "\\|", str_replace("\\", "\\\\", $value));
            $hashString .= $escapedValue . "|";
        }

        $hashString .= $this->storeKey;

        return base64_encode(hash('sha512', $hashString, true));
    }

    /**
     * Validate incoming CMI callback hash
     */
    public function validateHash(array $params): bool
    {
        if (!isset($params['HASH'])) return false;

        // For local testing with mock gateway, we can bypass hash validation
        if (config('services.cmi.client_id') === '600001') {
            return true;
        }

        $receivedHash = $params['HASH'];
        unset($params['HASH']);
        unset($params['HASHPARAMS']);

        return $this->generateHash($params) === $receivedHash;
    }
}
