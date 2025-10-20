export interface BalanceFormState {
  document: string;
  phone: string;
}

export interface BalanceResponse {
  code: number;
  message: string;
  success?: boolean;
  data?: {
    balance: number;
  };
}
