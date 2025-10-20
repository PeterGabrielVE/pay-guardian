import React, { useState } from "react";
import { checkBalance } from "~/utils/api";
import type { BalanceFormState, BalanceResponse } from "./types/balance";
import { BalanceForm } from "./components/BalanceForm";

export default function CheckBalancePage() {
    const [form, setForm] = useState<BalanceFormState>({ document: "", phone: "" });
    const [response, setResponse] = useState<BalanceResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse(null);
        setLoading(true);

        try {
            const res = await checkBalance(form);
            setResponse(res);
        } catch (err: any) {
            setResponse({ code: 99, message: err.message || "Error de red" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-gray-100">
            <div className="w-full max-w-md bg-gray-800/80 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    Consultar Saldo
                </h2>

                <BalanceForm form={form} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />

                {response && response.success !== undefined && (
                    <p className={`mt-4 p-2 rounded text-center ${response.success ? "bg-green-800/30 text-green-300 border border-green-600"
                            : "bg-red-800/30 text-red-300 border border-red-600"
                        }`}>
                        {response.success ? `Saldo: $${response.data?.balance}` : response.message}
                    </p>
                )}

                {response && response.success === undefined && (
                    <p className="mt-4 p-2 rounded text-center bg-yellow-800/30 text-yellow-200 border border-yellow-600">
                        {response.message}
                    </p>
                )}
            </div>
        </div>
    );
}
