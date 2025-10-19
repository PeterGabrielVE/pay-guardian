import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { listClients, type ClientData } from "~/utils/api";
import type { ApiResponse } from '~/utils/api';

export function meta(args: any) {
  return [
    { title: "Clientes App" },
    { name: "description", content: "Listado de clientes y registro" },
  ];
}

export default function Home() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response: ApiResponse<ClientData[]> = await listClients();
        if (response.code === 200 && response.data) {
          setClients(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Error fetching clients");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>

      <button
        onClick={() => navigate("/register-client")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Registrar Cliente
      </button>

      {loading && <p>Loading clients...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {clients.map((client) => (
          <li key={client.id} className="border p-2 rounded">
            <strong>{client.names}</strong> — {client.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
