import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ClientData, ValidationErrors } from "~/utils/api";
import { registerClient } from "~/utils/api";
import { InputField } from "./../helpers/InputField";
import { FormMessage } from "./../helpers/FormMessage";
import { clientFields } from "~/helpers/field";

export default function RegisterClient() {
  const navigate = useNavigate();

  const [form, setForm] = useState<ClientData>({
    document: "",
    names: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({});
  setSuccess("");
  setLoading(true); // <-- activamos loading

  try {
    const result = await registerClient(form);

    if ("errors" in result) {
      setErrors(result.errors ?? {});
    } else {
      setSuccess("✅ Cliente registrado correctamente!");
      setForm({ document: "", names: "", email: "", phone: "" });
    }
  } catch (error) {
    setErrors({ general: ["Ocurrió un error inesperado"] });
  } finally {
    setLoading(false); 
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
          Registrar Cliente
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {clientFields.map(({ label, name, type }) => (
            <InputField
              key={name}
              label={label}
              name={name}
              type={type}
              value={String(form[name as keyof ClientData] ?? "")}
              onChange={handleChange}
              error={errors[name as keyof ValidationErrors]?.[0]}
            />
          ))}

          <button
            type="submit"
            disabled={loading} // <-- deshabilitar mientras carga
            className={`w-full py-3 mt-2 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-indigo-500/30
              ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"}`}
          >
            {loading ? "Registrando..." : "Registrar Cliente"}
          </button>
        </form>

        {success && <FormMessage message={success} type="success" />}

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 py-3 font-semibold rounded-lg bg-gray-700 hover:bg-gray-600 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-indigo-500/30 text-white"
        >
          Ver Listado de Clientes
        </button>
      </div>
    </div>
  );
}
