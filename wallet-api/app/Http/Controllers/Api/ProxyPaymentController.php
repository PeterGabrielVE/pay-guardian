<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ProxyPaymentController extends Controller
{
    protected $client;

    public function __construct()
    {

        $baseUri = rtrim(config('services.wallet_core.db_service_url'), '/');
        if (empty($baseUri)) {
            throw new \Exception('DB_SERVICE_URL no está definido');
        }

        $this->client = new \GuzzleHttp\Client([
            'base_uri' => $baseUri,
            'timeout'  => 30,
        ]);
    }

    public function proccessPayment(Request $req)
    {
        $res = $this->client->post('/api/internal/wallets/pay', [
            'json' => $req->all()
        ]);
        return response()->json(json_decode($res->getBody(), true), $res->getStatusCode());
    }

    public function confirmPayment(Request $req)
    {
        $res = $this->client->post('/api/internal/wallets/confirm', [
            'json' => $req->all()
        ]);
        return response()->json(json_decode($res->getBody(), true), $res->getStatusCode());
    }
}
