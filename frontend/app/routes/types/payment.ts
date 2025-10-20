export interface PayFormState {
  document: string;
  phone: string;
  amount: string;
}

export interface ResponseData {
  code: number;
  message: string;
  session_id?: string;
}

export interface ConfirmFormProps {
  token: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export interface PayFormProps {
  form: PayFormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}