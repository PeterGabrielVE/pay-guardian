import axios, { AxiosError } from 'axios';
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
  code: number;
  message: string;
  data?: T;
  errors?: ValidationErrors;
}


const BASE_URL_API = "http://localhost:8001/api";

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Register a new client
export const registerClient = async (data: ClientData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/clients', data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse>;
    if (error.response?.status === 422) {
      return {
        code: 422,
        message: 'Validation errors',
        errors: error.response.data?.errors || {},
      };
    }
    throw err;
  }
};

// Fetch the list of clients
export const listClients = async (): Promise<ApiResponse<ClientData[]>> => {
  try {
    const response = await api.get<ApiResponse<ClientData[]>>('/clients');
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse>;
    // You can handle specific status codes if needed
    console.error('Error fetching clients:', error.message);
    throw err;
  }
};


export const rechargeWallet = async (form: FormState): Promise<ResponseData> => {
  const response = await fetch(`${BASE_URL_API}/wallet/recharge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      document: form.documento,
      phone: form.celular,
      amount: Number(form.valor),
    }),
  });

  return response.json();
};

export interface PayRequest {
  document: string;
  phone: string;
  amount: number;
}

export interface ConfirmRequest {
  session_id: string;
  token: string;
}

export const pay = async (data: PayRequest) => {
  const res = await fetch("http://localhost:8001/api/wallet/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en pago");
  return res.json();
};

export const confirmPay = async (data: ConfirmRequest) => {
  const res = await fetch("http://localhost:8001/api/wallet/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al confirmar pago");
  return res.json();
};


export default api;
