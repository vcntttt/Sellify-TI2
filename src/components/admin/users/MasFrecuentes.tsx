import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

import { useEffect, useState } from "react";
import { getTopFrecuentes } from "@/api/compradores"; 
import { ShowNotification } from "@/components/NotificationProvider";


interface Customer {
  nombre_completo: string;
  total_ventas: number;
}

export default function TopPurchasingCustomersCard() {
  const [topCustomers, setTopCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        const customers = await getTopFrecuentes();
        if (!Array.isArray(customers)) {
          throw new Error("Respuesta de la API no válida");
        }

        setTopCustomers(customers);
      } catch (error) {
        console.error("Error al cargar clientes frecuentes:", error);
        setError("Error al cargar clientes frecuentes.");
        ShowNotification("Error al cargar clientes frecuentes.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchTopCustomers();
  }, []);

  // Mostrar carga o error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="w-80 h-auto flex-col flex justify-between p-4">
      <CardHeader>
        <CardTitle className="flex justify-between text-sm">
          Clientes con Más Compras <ShoppingBag />
        </CardTitle>
        <CardDescription className="sr-only">
          Clientes con el mayor número de compras
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <ol className="list-decimal pl-4 space-y-2 text-sm">
          {topCustomers.length > 0 ? (
            topCustomers.map((customer, index) => (
              <li key={index} className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                  {index + 1}
                </span>
                {customer.nombre_completo} - {customer.total_ventas} compras
              </li>
            ))
          ) : (
            <p>No hay datos de clientes frecuentes disponibles.</p>
          )}
        </ol>
      </CardContent>
    </Card>
  );
}
