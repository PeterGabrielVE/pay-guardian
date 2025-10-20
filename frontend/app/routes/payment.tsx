import React, { useState } from "react";
import { pay, confirmPay } from "~/utils/api";
import type { PayFormState, ResponseData } from "./types/payment";
import { ConfirmForm } from "./components/ConfirmForm";
import { PayForm } from "./components/PayForm";

export default function PayWallet() {
    const [form, setForm] = useState<PayFormState>({ document: "", phone: "", amount: "" });
    const [response, setResponse] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [step, setStep] = useState<"pay" | "confirm">("pay");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value);

    const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        try {
            const res = await pay({ document: form.document, phone: form.phone, amount: Number(form.amount) });
            setSessionId(res.data.session_id || "");
            setStep("confirm");
            setResponse({ code: 0, message: "Token enviado a su correo (Mailhog para pruebas)", session_id: res.data.session_id });
        } catch (err: any) {
            setResponse({ code: 99, message: err.message || "Error de red" });
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!sessionId || !token) {
            setResponse({ code: 99, message: "Debe generar pago y colocar el token" });
            return;
        }

        setLoading(true);
        setResponse(null);

        try {
            const res = await confirmPay({ session_id: sessionId, token });
            setResponse({ code: 0, message: res.message });
            setStep("pay");
            setForm({ document: "", phone: "", amount: "" });
            setToken("");
            setSessionId("");
        } catch (err: any) {
            setResponse({ code: 99, message: err.message || "Error de red" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 text-gray-100">
            <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
                <div className="flex justify-center mb-4 text-4xl">💰</div>
                <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                    Pago de Billetera
                </h2>

                {step === "pay" ? (
                    <PayForm form={form} onChange={handleChange} onSubmit={handlePay} loading={loading} />
                ) : (
                    <ConfirmForm token={token} onChange={handleTokenChange} onSubmit={handleConfirm} loading={loading} />
                )}

                {response && (
                    <div className={`mt-6 p-4 rounded text-center ${response.code === 0
                            ? "bg-green-800/30 text-green-300 border border-green-600"
                            : "bg-red-800/30 text-red-300 border border-red-600"
                        }`}>
                        {response.message}
                    </div>
                )}
            </div>
        </div>
    );
}
