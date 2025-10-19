<?php

use App\Http\Controllers\Api\ClientController;

Route::post('/clients', [ClientController::class, 'registerClient']);
Route::get('/clients', [ClientController::class, 'listClients']);
