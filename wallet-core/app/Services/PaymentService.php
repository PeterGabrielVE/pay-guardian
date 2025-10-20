<?php

namespace App\Services;

use App\Repositories\PaymentRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Exception;

class PaymentService
{
    protected $repo;

    public function __construct(PaymentRepository $repo)
    {
        $this->repo = $repo;
    }

    public function processPayment(string $document, string $phone, float $amount): array
    {
        try {
            $client = $this->repo->findClient($document, $phone);
            if (!$client) {
                return ['success' => false, 'code' => 404, 'message' => 'Cliente no encontrado', 'data' => null];
            }

            $wallet = $client->wallet;
            if (!$wallet || $wallet->balance < $amount) {
                return ['success' => false, 'code' => 422, 'message' => 'Saldo insuficiente', 'data' => null];
            }

            $token = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);

            $session = $this->repo->createPaymentSession([
                'client_id'  => $client->id,
                'amount'     => $amount,
                'token'      => $token,
                'expires_at' => now()->addMinutes(5),
                'confirmed'  => false
            ]);

            Mail::raw("Tu código de confirmación es: {$token}", function ($m) use ($client) {
                $m->to($client->email)->subject('Código de confirmación de pago');
            });

            return ['success' => true, 'code' => 200, 'message' => 'Token enviado al correo electrónico', 'data' => ['session_id' => $session->id]];

        } catch (Exception $e) {
            return ['success' => false, 'code' => 500, 'message' => 'Error al procesar el pago: ' . $e->getMessage(), 'data' => null];
        }
    }

    public function confirmPayment(string $sessionId, string $token): array
    {
        try {
            $session = $this->repo->findPaymentSession($sessionId);
            if (!$session) return ['success' => false, 'code' => 404, 'message' => 'Sesión no encontrada', 'data' => null];
            if ($session->confirmed) return ['success' => false, 'code' => 400, 'message' => 'La sesión ya fue confirmada', 'data' => null];
            if (now()->gt($session->expires_at)) return ['success' => false, 'code' => 400, 'message' => 'El token ha expirado', 'data' => null];
            if ($session->token !== $token) return ['success' => false, 'code' => 400, 'message' => 'Token inválido', 'data' => null];

            DB::transaction(function () use ($session) {
                $wallet = $this->repo->getWalletForUpdate($session->client_id);

                if ($wallet->balance < $session->amount) {
                    throw new Exception('Saldo insuficiente');
                }

                $wallet->balance -= $session->amount;
                $wallet->save();

                $session->confirmed = true;
                $session->save();
            });

            return ['success' => true, 'code' => 200, 'message' => 'Pago confirmado y saldo descontado correctamente', 'data' => null];

        } catch (Exception $e) {
            return ['success' => false, 'code' => 500, 'message' => 'Error al confirmar el pago: ' . $e->getMessage(), 'data' => null];
        }
    }
}
