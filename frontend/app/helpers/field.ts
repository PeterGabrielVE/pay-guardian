export interface Field {
  label: string;
  name: string;
  type?: string;
}

export const clientFields: Field[] = [
  { label: "Documento", name: "document" },
  { label: "Nombre completo", name: "names" },
  { label: "Correo electrónico", name: "email", type: "email" },
  { label: "Teléfono", name: "phone" },
];

export const rechargeFields: Field[] = [
  { label: "Documento", name: "documento" },
  { label: "Celular", name: "celular" },
  { label: "Valor a recargar", name: "valor", type: "number" },
];

export const payFields = [
  { label: "Documento", name: "document", type: "text" },
  { label: "Celular", name: "phone", type: "text" },
  { label: "Monto", name: "amount", type: "number" },
];