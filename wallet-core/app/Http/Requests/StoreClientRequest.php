<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Permitir a todos, ajusta según auth si quieres
    }

    public function rules()
    {
        return [
            'document' => 'required|unique:clients,document',
            'names'    => 'required|string|max:255',
            'email'    => 'required|email|unique:clients,email',
            'phone'    => 'required|string|max:20',
        ];
    }

    public function messages()
    {
        return [
            'document.required' => 'El documento es obligatorio',
            'email.email'       => 'El email debe ser válido',
            'phone.required'    => 'El teléfono es obligatorio',
        ];
    }
}
