
export interface FormState {
  documento: string;
  celular: string;
  valor: string;
}

export interface ResponseData {
  code: number;
  message: string;
  [key: string]: any;
}