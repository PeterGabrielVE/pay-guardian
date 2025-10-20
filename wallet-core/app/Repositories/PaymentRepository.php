<?php

namespace App\Repositories;

use App\Models\Client;
use App\Models\Wallet;
use App\Models\PaymentSession;

class PaymentRepository
{
    public function findClient(string $document, string $phone): ?Client
    {
        return Client::where('document', $document)->where('phone', $phone)->first();
    }

    public function createPaymentSession(array $data): PaymentSession
    {
        return PaymentSession::create($data);
    }

    public function findPaymentSession(string $id): ?PaymentSession
    {
        return PaymentSession::where('id', $id)->first();
    }

    public function getWalletForUpdate(int $clientId): Wallet
    {
        return Wallet::where('client_id', $clientId)->lockForUpdate()->firstOrFail();
    }
}
