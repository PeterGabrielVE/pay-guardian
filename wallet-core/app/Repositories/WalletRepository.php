<?php

namespace App\Repositories;

use App\Models\Client;
use App\Models\Wallet;

class WalletRepository
{
    public function findClientByDocument(string $document): ?Client
    {
        return Client::where('document', $document)->first();
    }

    public function getWalletByClientId(int $clientId): Wallet
    {
        return Wallet::firstOrNew(['client_id' => $clientId]);
    }

    public function saveWallet(Wallet $wallet): bool
    {
        return $wallet->save();
    }
}
