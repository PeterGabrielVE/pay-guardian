<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wallet;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'document',
        'names',
        'email',
        'phone',
    ];

    public function wallet()
    {
        return $this->hasOne(Wallet::class);
    }
}
