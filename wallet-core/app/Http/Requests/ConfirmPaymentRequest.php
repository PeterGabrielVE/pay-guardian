<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmPaymentRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            'session_id' => 'required|uuid',
            'token'      => 'required|digits:6',
        ];
    }
    public function messages()
    {
        return [
            'session_id.required' => 'El campo Session ID es obligatorio.',
            'session_id.uuid'     => 'El Session ID debe ser un UUID válido.',
            'token.required'      => 'El campo Token es obligatorio.',
            'token.digits'        => 'El Token debe tener exactamente 6 dígitos.',
        ];
    }
}
