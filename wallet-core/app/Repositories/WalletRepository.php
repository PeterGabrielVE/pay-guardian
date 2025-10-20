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

    public function getWalletBalance(string $document, string $phone): ?float
    {
        $client = Client::where('document', $document)
                    ->where('phone', $phone)
                    ->first();

        return $client && $client->wallet ? $client->wallet->balance : null;
    }
}
