import axios, { AxiosError } from "axios";
import type { FormState, ResponseData } from "../routes/types/recharge";

export interface ClientData {
  id?: number;
  document: string;
  names: string;
  email: string;
  phone: string;
}

export interface ValidationErrors {
  [key: string]: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  errors?: ValidationErrors;
}

const BASE_URL_API = "http://localhost:8001/api";
const BASE_URL_CORE = "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL_CORE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Register a new client
export const registerClient = async (data: ClientData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>("/clients", data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse>;
    if (error.response?.status === 422) {
      return {
        success: false,
        code: 422,
        message: "Validation errors",
        errors: error.response.data?.errors || {},
      };
    }
    throw err;
  }
};

// Fetch the list of clients
export const listClients = async (): Promise<ApiResponse<ClientData[]>> => {
  try {
    const response = await api.get<ApiResponse<ClientData[]>>("/clients");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse>;
    console.error("Error fetching clients:", error.message);
    throw err;
  }
};

// Recarga de wallet
export const rechargeWallet = async (form: FormState): Promise<ResponseData> => {
  const res = await fetch(`${BASE_URL_API}/wallet/recharge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      document: form.documento,
      phone: form.celular,
      amount: Number(form.valor),
    }),
  });
  return res.json();
};

// Pago
export interface PayRequest {
  document: string;
  phone: string;
  amount: number;
}
export interface ConfirmRequest {
  session_id: string;
  token: string;
}
export const pay = async (data: PayRequest): Promise<ApiResponse<{ session_id: string }>> => {
  const res = await fetch(`${BASE_URL_API}/wallet/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en pago");
  return res.json();
};

export const confirmPay = async (data: ConfirmRequest): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL_API}/wallet/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al confirmar pago");
  return res.json();
};

// Consultar saldo
export interface CheckBalanceParams {
  document: string;
  phone: string;
}

export const checkBalance = async (
  params: CheckBalanceParams
): Promise<ApiResponse<{ balance: number }>> => {
  try {
    const res = await fetch(`${BASE_URL_API}/wallet/balance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Error en la consulta de saldo");
    }
    return res.json();
  } catch (err: any) {
    return {
      success: false,
      code: 99,
      message: err.message || "Error de red",
    };
  }
};

export default api;
