import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { getMonthlySales } from "@/api/ventas";

export default function CardVentasMes() {
  const [salesCount, setSalesCount] = useState(0);
  const [error] = useState(null);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const sales = await getMonthlySales();
        if (!sales || sales.length === 0) {
          setSalesCount(0);
        } else {
          setSalesCount(sales.length); 
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchSalesData();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="flex justify-between">
          Ventas del mes <TrendingUp />
        </CardTitle>
        <CardDescription className="sr-only">
          Ventas del mes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-4xl">{salesCount}</p>  
            <p className="text-muted-foreground">Ventas realizadas este mes</p>
          </>
        )}
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
