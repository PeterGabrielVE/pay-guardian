<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckBalanceRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            'document' => 'required|string',
            'phone'    => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'document.required' => 'El campo Documento es obligatorio.',
            'document.string'   => 'El Documento debe ser un texto válido.',
            'phone.required'    => 'El campo Celular es obligatorio.',
            'phone.string'      => 'El Celular debe ser un texto válido.',
        ];
    }
}
