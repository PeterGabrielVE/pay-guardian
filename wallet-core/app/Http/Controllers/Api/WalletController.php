<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\WalletService;
use App\Http\Requests\RechargeWalletRequest;
use Exception;

class WalletController extends Controller
{
    protected WalletService $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }


    public function recharge(RechargeWalletRequest $request)
    {
        $result = $this->walletService->recharge($request->validated());

        return response()->json($result, $result['code'] === 0 ? 200 : 400);
    }
}
