import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { FormState, ResponseData } from "./types/recharge";
import { rechargeWallet } from "../utils/api";
import { InputField } from "../helpers/InputField";
import { rechargeFields } from "../helpers/field";

const Recharge: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    documento: "",
    celular: "",
    valor: "",
  });

  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const data = await rechargeWallet(form);
      setResponse(data);
    } catch (error) {
      setResponse({ code: 99, message: "Error de red" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 text-gray-100">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="flex justify-center mb-4 text-4xl">💰</div>
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
          Recarga de Billetera
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {rechargeFields.map(({ label, name, type }) => (
            <InputField
              key={name}
              label={label}
              name={name}
              type={type}
              value={String(form[name as keyof FormState] ?? "")}
              onChange={handleChange}
              required
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-500/30
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
              }`}
          >
            {loading ? "Procesando..." : "Recargar"}
          </button>
        </form>

        {response && (
          <div
            className={`mt-6 p-4 rounded text-center ${
              response.code === 0
                ? "bg-green-800/30 text-green-300 border border-green-600"
                : "bg-red-800/30 text-red-300 border border-red-600"
            }`}
          >
            {response.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recharge;
