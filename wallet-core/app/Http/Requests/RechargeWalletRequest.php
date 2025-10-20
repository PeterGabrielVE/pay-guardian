<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RechargeWalletRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Cambia a true si todos los usuarios pueden usar este request
        return true;
    }

    public function rules(): array
    {
        return [
            'document' => 'required|string',
            'phone' => 'required|string',
            'amount' => 'required|integer|min:1'
        ];
    }

    public function messages(): array
    {
        return [
            'document.required' => 'El documento es obligatorio',
            'phone.required' => 'El teléfono es obligatorio',
            'amount.required' => 'El monto es obligatorio',
            'amount.integer' => 'El monto debe ser un número entero',
            'amount.min' => 'El monto debe ser al menos 1'
        ];
    }
}
