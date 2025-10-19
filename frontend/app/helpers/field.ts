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