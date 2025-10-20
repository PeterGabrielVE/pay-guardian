<?php

use App\Http\Controllers\Api\RechargeController;
Route::post('/wallet/recharge', [RechargeController::class, 'recharge']);
