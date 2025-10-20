<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RechargeWalletRequest;
use App\Services\RechargeService;

class RechargeController extends Controller
{
    protected RechargeService $rechargeService;

    public function __construct(RechargeService $rechargeService)
    {
        $this->rechargeService = $rechargeService;
    }

    public function recharge(RechargeWalletRequest $request)
    {
        $result = $this->rechargeService->recharge($request->validated());

        return response()->json($result['body'], $result['status']);
    }
}
