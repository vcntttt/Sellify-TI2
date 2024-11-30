import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, TrendingUp } from "lucide-react";
import { useTimeVentas } from "@/hooks/use-time-ventas";
import { startOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Props {
  dashboard?: boolean;
}

export default function CardVentasMes({ dashboard }: Props) {
  const { sales, isLoading } = useTimeVentas({
    start: startOfMonth(new Date()),
    end: new Date(),
  });

  return (
    <Card className="h-full">
      <CardHeader className="mb-2">
        <CardTitle className="flex justify-between">
          Ventas del mes
          <TrendingUp />
        </CardTitle>
        <CardDescription className="sr-only">Ventas del mes</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="size-10" />
        ) : (
          <p className="text-4xl">{sales ?? 0}</p>
        )}
        <>
          <p className="text-muted-foreground">Ventas realizadas este mes</p>
        </>
      </CardContent>
      <CardFooter>
        {dashboard ? (
          <Button variant={"link"} asChild className={"hover:underline"}>
            <Link href="/dashboard/ventas" className="px-0 py-0">
              <span className="mr-2">Ver más</span>
              <ExternalLink className="size-4" />
            </Link>
          </Button>
        ) : (
          <div className="opacity-0">a</div>
        )}
      </CardFooter>
    </Card>
  );
}
