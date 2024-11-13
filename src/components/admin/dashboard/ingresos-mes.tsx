import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { DollarSign, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getMonthlyRevenue } from "@/api/ingresos-mes";

export default function CardIngresos() {
  const [revenue, setRevenue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        const total = await getMonthlyRevenue();
        setRevenue(total);
      } catch (err) {
        setError("Error al obtener los ingresos del mes.");
        console.error(err);
      }
    }

    fetchRevenue();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="flex justify-between">
          Ingresos <DollarSign />
        </CardTitle>
        <CardDescription className="sr-only">Ingresos del mes</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : revenue !== null ? (
          <>
            <p className="text-4xl">{formatPrice(revenue)}</p>
            <p className="text-muted-foreground">Total ventas </p>
          </>
        ) : (
          <p>Cargando ingresos...</p>
        )}
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
