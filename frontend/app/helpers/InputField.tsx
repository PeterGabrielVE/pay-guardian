import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
  required
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={`Ingrese ${label.toLowerCase()}`}
      className={`w-full px-4 py-2 rounded-lg bg-gray-900 border ${
        error ? "border-red-500" : "border-gray-700"
      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
      required={required}
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);
