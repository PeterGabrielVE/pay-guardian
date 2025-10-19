<?php

namespace App\Services;

use App\Repositories\Interfaces\ClientRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Exception;

class ClientService
{
    protected $clientRepo;

    public function __construct(ClientRepositoryInterface $clientRepo)
    {
        $this->clientRepo = $clientRepo;
    }

    public function registerClient(array $data)
    {
        try {
            $client = $this->clientRepo->create($data);

            return [
                'code' => 201,
                'message' => 'Cliente registrado con éxito',
                'data' => $client
            ];
        } catch (Exception $e) {
            Log::error('Error al registrar cliente: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'data' => $data
            ]);
            return [
                'code' => 500,
                'message' => 'Error al registrar el cliente',
                'error' => $e->getMessage()
            ];
        }
    }

    public function getAllClients()
    {
        try {
            $clients = $this->clientRepo->all(); // Obtener todos los clientes

            return [
                'code' => 200,
                'message' => 'Listado de clientes obtenido con éxito',
                'data' => $clients
            ];
        } catch (\Exception $e) {
            // Log del error
            \Log::error('Error obteniendo clientes: ' . $e->getMessage());

            return [
                'code' => 500,
                'message' => 'Error al obtener el listado de clientes',
                'error' => $e->getMessage()
            ];
        }
    }
}
