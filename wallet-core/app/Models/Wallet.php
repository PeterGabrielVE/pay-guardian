<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Client;

class Wallet extends Model
{
    protected $fillable = ['client_id', 'balance'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
