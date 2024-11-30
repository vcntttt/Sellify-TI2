import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { startOfMonth } from "date-fns";
import { useTimeVentas } from "@/hooks/use-time-ventas";

export default function Top5ProductsCard() {
  const { filteredSales } = useTimeVentas({
    start: startOfMonth(new Date()),
    end: new Date(),
  });

  const productCount: Record<string, { nombre: string; cantidad: number }> = {};

  filteredSales.forEach((venta) => {
    venta.productos.forEach((producto) => {
      if (productCount[producto.nombre]) {
        productCount[producto.nombre].cantidad += producto.cantidad;
      } else {
        productCount[producto.nombre] = {
          nombre: producto.nombre,
          cantidad: producto.cantidad,
        };
      }
    });
  });

  const top5Productos = Object.values(productCount)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  return (
    <Card className="h-full flex-col flex justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Productos más vendidos este mes
          <ShoppingCart />
        </CardTitle>
        <CardDescription className="sr-only">Ventas del mes</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal pl-4 space-y-2">
          {top5Productos.map((product, index) => (
            <li key={index} className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                {index + 1}
              </span>
              {product.nombre} - {product.cantidad} vendidos
            </li>
          ))}
        </ol>
      </CardContent>
      <CardFooter>
        <Button variant={"link"} asChild className={"hover:underline"}>
          <Link href="/dashboard/productos" className="px-0 py-0">
            <span className="mr-2">Ver más</span>
            <ExternalLink className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
