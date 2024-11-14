import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

/*import { useEffect, useState } from "react";
import { getTopFrecuentes } from "@/api/Client";  // Aquí obtienes los clientes más frecuentes
import { UserResponse } from "@/types/users";
import { ShowNotification } from "@/components/NotificationProvider";

export default function TopPurchasingCustomersCard() {
  const [topCustomers, setTopCustomers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        const customers = await getTopFrecuentes(); // Llama a la API para obtener los clientes frecuentes
        setTopCustomers(customers.slice(0, 5)); // Toma los primeros 5 clientes
        if (customers.length > 0) {
          setClientName(customers[0].nombre); // Muestra el nombre del primer cliente (Top)
        }
      } catch (error) {
        setError("Error al cargar clientes frecuentes.");
        ShowNotification("Error al cargar clientes frecuentes.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchTopCustomers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;*/

  export default function TopPurchasingCustomersCard() {
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
            <li className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                1
              </span>
              Juan Pérez - 45 compras
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                2
              </span>
              Ana Gómez - 42 compras
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                3
              </span>
              Carlos López - 38 compras
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                4
              </span>
              Laura Martínez - 36 compras
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                5
              </span>
              Pedro Rodríguez - 34 compras
            </li>
          </ol>
        </CardContent>
      </Card>
    );
  }

  /*return (
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
        {clientName && (
          <p className="text-sm text-gray-600 mb-2">Cliente más frecuente: {clientName}</p>
        )}
        <ol className="list-decimal pl-4 space-y-2 text-sm">
          {topCustomers.map((customer, index) => (
            <li key={customer.rut} className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                {index + 1}
              </span>
              {customer.nombre} - {customer.compras}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}*/
