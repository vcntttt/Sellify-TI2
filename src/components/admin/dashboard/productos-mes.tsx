import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { startOfMonth } from "date-fns";
import { useTimeVentas } from "@/hooks/use-time-ventas";

export default function CardProductosVendidos() {
  const { filteredSales } = useTimeVentas({
    start: startOfMonth(new Date()),
    end: new Date(),
  });

  const productsCount = filteredSales.reduce((acc, sale) => {
    return acc + sale.productos.reduce((productAcc, producto) => {
      return productAcc + producto.cantidad;
    }, 0);
  }, 0);

  return (
    <Card className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="flex justify-between">
          Productos Vendidos <ShoppingCart />
        </CardTitle>
        <CardDescription className="sr-only">Productos vendidos este mes</CardDescription>
      </CardHeader>
      <CardContent>
          <p className="text-4xl">{productsCount}</p>
        <p className="text-muted-foreground">Productos vendidos este mes</p>
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
