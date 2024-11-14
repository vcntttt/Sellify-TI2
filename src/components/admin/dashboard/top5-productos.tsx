import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getTop5Products } from "@/api/top5-productos";

export default function Top5ProductsCard() {
  const [topProducts, setTopProducts] = useState<{ producto_nombre: string, cantidad: number }[]>([]);
  const [error] = useState(null);

  useEffect(() => {
    async function fetchTopProducts() {
      try {
        const products = await getTop5Products();
        setTopProducts(products);
      } catch (err) {
        console.error("Error al obtener los productos más vendidos:", err);

      }
    }

    fetchTopProducts();
  }, []);

  return (
    <Card className="h-full flex-col flex justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Productos más vendidos <ShoppingCart />
        </CardTitle>
        <CardDescription className="sr-only">Ventas del mes</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">Error al cargar datos</p>
        ) : (
          <ol className="list-decimal pl-4 space-y-2">
            {topProducts.map((product, index) => (
              <li key={index} className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                  {index + 1}
                </span>
                {product.producto_nombre} - {product.cantidad} vendidos
              </li>
            ))}
          </ol>
        )}
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
