import React from "react";

interface FormMessageProps {
  message: string;
  type?: "success" | "error";
}

export const FormMessage: React.FC<FormMessageProps> = ({ message, type = "success" }) => (
  <div
    className={`mt-6 text-center font-medium animate-pulse ${
      type === "success" ? "text-green-400" : "text-red-400"
    }`}
  >
    {message}
  </div>
);
