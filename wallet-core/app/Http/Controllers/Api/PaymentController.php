<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProcessPaymentRequest;
use App\Http\Requests\ConfirmPaymentRequest;
use App\Services\PaymentService;

class PaymentController extends Controller
{
    protected $service;

    public function __construct(PaymentService $service)
    {
        $this->service = $service;
    }

    public function processPayment(ProcessPaymentRequest $request)
    {
        $result = $this->service->processPayment(
            $request->document,
            $request->phone,
            $request->amount
        );

        return response()->json($result, $result['code']);
    }

    public function confirmPayment(ConfirmPaymentRequest $request)
    {
        $result = $this->service->confirmPayment(
            $request->session_id,
            $request->token
        );

        return response()->json($result, $result['code']);
    }
}
