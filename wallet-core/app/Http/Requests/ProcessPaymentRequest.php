<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class ProcessPaymentRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            'document' => 'required|string',
            'phone'    => 'required|string',
            'amount'   => 'required|numeric|min:0.01',
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
