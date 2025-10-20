<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\WalletController;
use App\Http\Controllers\Api\PaymentController;

Route::post('/clients', [ClientController::class, 'registerClient']);
Route::get('/clients', [ClientController::class, 'listClients']);

Route::post('/internal/wallets/recharge', [WalletController::class, 'recharge']);
Route::post('/internal/wallets/pay', [PaymentController::class, 'processPayment']);
Route::post('/internal/wallets/confirm', [PaymentController::class, 'confirmPayment']);
