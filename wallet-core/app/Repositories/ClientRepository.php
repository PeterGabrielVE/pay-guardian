<?php

namespace App\Repositories;

use App\Models\Client;
use Illuminate\Support\Facades\DB;
use App\Repositories\Interfaces\ClientRepositoryInterface;
use Exception;

class ClientRepository implements ClientRepositoryInterface
{
    protected $model;

    public function __construct(Client $model)
    {
        $this->model = $model;
    }

    public function create(array $data): Client
    {
        // Usamos transacción para asegurarnos de que todo se guarde correctamente
        return DB::transaction(function () use ($data) {
            $client = $this->model->create($data);
            return $client;
        });
    }

    public function all()
    {
        return $this->model->all();
    }
}
