import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { DollarSign, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTimeVentas } from "@/hooks/use-time-ventas";
import { startOfMonth } from "date-fns";

export default function CardIngresos() {
  const { filteredSales } = useTimeVentas({
    start: startOfMonth(new Date()),
    end: new Date(),
  });

  const totalRevenue = filteredSales.reduce((acc, sale) => {
    return acc + sale.total_con_iva;
  }, 0);

  return (
    <Card className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="flex justify-between">
          Ingresos <DollarSign />
        </CardTitle>
        <CardDescription className="sr-only">Ingresos del mes</CardDescription>
      </CardHeader>
      <CardContent>
          <>
            <p className="text-4xl">{formatPrice(totalRevenue)}</p>
            <p className="text-muted-foreground">Total ventas </p>
          </>
        
      </CardContent>
      <CardFooter>
        <Button variant={"link"} asChild className={"hover:underline"}>
          <Link href="/dashboard/ventas" className="px-0 py-0">
            <span className="mr-2">Ver más</span>
            <ExternalLink className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
