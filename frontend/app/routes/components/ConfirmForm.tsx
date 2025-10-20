import { InputField } from "~/helpers/InputField";
import type { ConfirmFormProps } from "../types/payment";

export const ConfirmForm: React.FC<ConfirmFormProps> = ({ token, onChange, onSubmit, loading }) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <InputField
      label="Token"
      name="token"
      type="text"
      value={token}
      onChange={onChange}
      required
    />

    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3 mt-2 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-500/30 ${
        loading
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
      }`}
    >
      {loading ? "Confirmando..." : "Confirmar Pago"}
    </button>
  </form>
);