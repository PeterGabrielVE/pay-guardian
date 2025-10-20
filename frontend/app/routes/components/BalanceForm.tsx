import React, { type ChangeEvent, type FormEvent } from "react";
import { InputField } from "~/helpers/InputField";
import type { BalanceFormState } from "../types/balance";


interface Props {
    form: BalanceFormState;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    loading: boolean;
}

export const BalanceForm: React.FC<Props> = ({ form, onChange, onSubmit, loading }) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <InputField label="Documento" name="document" value={form.document} onChange={onChange} />
        <InputField label="Celular" name="phone" value={form.phone} onChange={onChange} />
        <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50"
        >
            {loading ? "Consultando..." : "Consultar Saldo"}
        </button>
    </form>
);
