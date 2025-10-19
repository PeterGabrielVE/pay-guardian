<?php

namespace App\Http\Controllers\Api;

use App\Services\ClientService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;

class ClientController extends Controller
{
    protected $clientService;

    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    public function registerClient(StoreClientRequest $request)
    {
        $result = $this->clientService->registerClient($request->validated());

        return response()->json($result, $result['code']);
    }

    public function listClients(Request $request)
    {
        $result = $this->clientService->getAllClients();
        return response()->json($result, $result['code']);
    }
}
