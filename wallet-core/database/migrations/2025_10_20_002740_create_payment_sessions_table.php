<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment_sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();                  // UUID como ID
            $table->unsignedBigInteger('client_id');        // Referencia al cliente
            $table->decimal('amount', 15, 2);               // Monto de la compra
            $table->string('token', 6);                     // Token de confirmación
            $table->timestamp('expires_at');                // Fecha de expiración
            $table->boolean('confirmed')->default(false);   // Estado de confirmación
            $table->timestamps();

            $table->foreign('client_id')
                  ->references('id')
                  ->on('clients')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_sessions');
    }
};
