import React, { useState } from "react";
import { payFields } from "~/helpers/field";
import type { PayFormProps, PayFormState } from "../types/payment";
import { InputField } from "~/helpers/InputField";


export const PayForm: React.FC<PayFormProps> = ({ form, onChange, onSubmit, loading }) => (
  <form onSubmit={onSubmit} className="space-y-6">
    {payFields.map(({ label, name, type }) => (
      <InputField
        key={name}
        label={label}
        name={name}
        type={type}
        value={form[name as keyof PayFormState]}
        onChange={onChange}
        required
      />
    ))}

    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3 mt-2 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-500/30 ${
        loading
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
      }`}
    >
      {loading ? "Procesando..." : "Generar Pago"}
    </button>
  </form>
);