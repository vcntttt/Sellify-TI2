import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { useTimeVentas } from "@/hooks/use-time-ventas";
import { endOfWeek, startOfWeek } from "date-fns";

export default function CardVentasSemana() {
  const { sales, isLoading } = useTimeVentas({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 })
  });
  

  return (
    <Card className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="flex justify-between">
          Ventas de la semana
          <TrendingUp />
        </CardTitle>
        <CardDescription className="sr-only">
          Ventas de la semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="size-10" />
        ) : (
          <p className="text-4xl">{sales ?? 0}</p>
        )}
        <>
          <p className="text-muted-foreground">Ventas realizadas esta semana</p>
        </>
      </CardContent><CardFooter>
          <div className="opacity-0">a</div>
          </CardFooter>
    </Card>
  );
}
