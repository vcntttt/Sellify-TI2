import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function CardVentasMes() {
  return (
    <Card className="h-full">
    <CardHeader className="mb-2">
      <CardTitle className="flex justify-between">
        Ventas <TrendingUp />
      </CardTitle>
      <CardDescription className="sr-only">
        Ventas del mes
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-4xl">200</p>
      <p className="text-muted-foreground">+20% que el mes pasado</p>
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
  )
}