<?php

namespace App\Services;

use App\Repositories\WalletRepository;
use Illuminate\Support\Facades\DB;
use Exception;

class WalletService
{
    protected WalletRepository $repository;

    public function __construct(WalletRepository $repository)
    {
        $this->repository = $repository;
    }

    public function recharge(array $data): array
    {
        try {
            $client = $this->repository->findClientByDocument($data['document']);
            if (!$client) {
                return [
                    'code' => 3,
                    'message' => 'Cliente no encontrado',
                    'saldo' => null
                ];
            }

            if ($client->phone !== $data['phone']) {
                return [
                    'code' => 4,
                    'message' => 'El celular no coincide con el registro del cliente',
                    'saldo' => null
                ];
            }

            $newBalance = 0;

            DB::transaction(function () use ($client, $data, &$newBalance) {
                $wallet = $this->repository->getWalletByClientId($client->id);
                $wallet->balance = ($wallet->balance ?? 0) + $data['amount'];
                $this->repository->saveWallet($wallet);
                $newBalance = $wallet->balance;
            });

            return [
                'code' => 0,
                'message' => 'Recarga exitosa',
                'saldo' => $newBalance
            ];

        } catch (Exception $e) {
            return [
                'code' => $e->getCode() ?: 1,
                'message' => $e->getMessage(),
                'saldo' => null
            ];
        }
    }

     public function checkBalance(string $document, string $phone): array
    {
        try {
            $balance = $this->repository->getWalletBalance($document, $phone);

            if ($balance === null) {
                return [
                    'success' => false,
                    'code' => 404,
                    'message' => 'Cliente o billetera no encontrada',
                    'data' => null
                ];
            }

            return [
                'success' => true,
                'code' => 200,
                'message' => 'Saldo obtenido correctamente',
                'data' => ['balance' => $balance]
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'code' => 500,
                'message' => 'Error al consultar saldo: ' . $e->getMessage(),
                'data' => null
            ];
        }
    }
}
