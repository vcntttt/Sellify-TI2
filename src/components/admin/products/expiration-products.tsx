import { useMemo } from "react";
import { Producto } from "@/types/products";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ExpirationProductsProps {
  data: Producto[];
}

export function ExpirationProducts({ data }: ExpirationProductsProps) {
  const expirationProducts = useMemo(() => {
    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);
    return data.filter((product) => {
      const dueDate = new Date(product.dueDate);
      return dueDate >= now && dueDate <= oneWeekFromNow;
    });
  }, [data]);

  return (
    <Card className="h-full flex-col flex justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Productos por vencer <ShoppingCart />
        </CardTitle>
        <CardDescription className="sr-only">
          Productos por vencer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-decimal pl-4 space-y-2">
          {expirationProducts.map((product, index) => (
            <li key={product.codigoBarras} className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
                {index + 1}
              </span>
              {product.name}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
