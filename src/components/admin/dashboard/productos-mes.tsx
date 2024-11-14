import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getMonthlyProducts } from "@/api/productos-mes";

export default function CardProductosVendidos() {
  const [productsCount, setProductsCount] = useState<number | null>(null);
  const [error] = useState(null);

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const totalProductos = await getMonthlyProducts();
        setProductsCount(totalProductos);
      } catch (err) {
        console.error("Error al obtener la cantidad de productos vendidos:", err);
      }
    }

    fetchProductsData();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="flex justify-between">
          Productos Vendidos <ShoppingCart />
        </CardTitle>
        <CardDescription className="sr-only">Productos vendidos este mes</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">Error al cargar datos</p>
        ) : (
          <p className="text-4xl">{productsCount}</p>
        )}
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
