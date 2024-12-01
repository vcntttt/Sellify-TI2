import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useVentas } from "@/hooks/query/use-ventas";

interface Cajero {
  nombre: string
  cantidadVentas: number
}

export default function TopCajerosEnVentasCard() {
  const { data : ventas = [], isFetching } = useVentas();
  const cajeros: Cajero[] = Object.values(
    ventas.reduce((acc: Record<string, Cajero>, venta: any) => {
      const { cajero } = venta;
  
      if (!acc[cajero]) {
        acc[cajero] = { nombre: cajero, cantidadVentas: 0 };
      }
  
      acc[cajero].cantidadVentas += 1;
  
      return acc;
    }, {})
  );

  if (isFetching) return <div>Loading...</div>;

  return (
    <Card className="w-80 h-auto flex-col flex justify-between p-4">
      <CardHeader>
        <CardTitle className="flex justify-between text-sm">
          Cajeros con Más Ventas <ShoppingBag />
        </CardTitle>
        <CardDescription className="sr-only">
          Cajeros con el mayor número de ventas
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <ol className="list-decimal pl-4 space-y-2 text-sm">
          {cajeros.length > 0 ? (
            cajeros.map((cajero, index) => (
              <li key={index} className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                  {index + 1}
                </span>
                {cajero.nombre} - {cajero.cantidadVentas} ventas
              </li>
            ))
          ) : (
            <p>No hay datos de cajeros disponibles.</p>
          )}
        </ol>
      </CardContent>
    </Card>
  );
}
