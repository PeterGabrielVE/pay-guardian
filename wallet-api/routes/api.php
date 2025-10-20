<?php

use App\Http\Controllers\Api\RechargeController;
use App\Http\Controllers\Api\ProxyPaymentController;

Route::post('/wallet/recharge', [RechargeController::class, 'recharge']);

Route::post('/wallet/pay', [ProxyPaymentController::class, 'proccessPayment']);
Route::post('/wallet/confirm', [ProxyPaymentController::class, 'confirmPayment']);
Route::post('/wallet/balance', [ProxyPaymentController::class, 'checkBalance']);
