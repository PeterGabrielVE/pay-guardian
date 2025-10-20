<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\WalletController;

Route::post('/clients', [ClientController::class, 'registerClient']);
Route::get('/clients', [ClientController::class, 'listClients']);

Route::post('/internal/wallets/recharge', [WalletController::class, 'recharge']);
