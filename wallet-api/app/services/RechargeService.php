<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class RechargeService
{
    protected string $coreUrl;

    public function __construct()
    {
        $this->coreUrl = env('CORE_URL', 'http://wallet-core:8000') . '/api/internal/wallets/recharge';
    }

    public function recharge(array $data): array
    {
        try {
            $response = Http::post($this->coreUrl, $data);

            return [
                'status' => $response->status(),
                'body' => $response->json()
            ];
        } catch (\Exception $e) {
            return [
                'status' => 500,
                'body' => [
                    'code' => 99,
                    'message' => 'Error comunicando con el core: ' . $e->getMessage()
                ]
            ];
        }
    }
}
