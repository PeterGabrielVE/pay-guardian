import axios, { AxiosError } from 'axios';

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

export default api;
