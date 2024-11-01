import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CardProductosVendidos() {
  return (
    <Card className="h-full">
    <CardHeader className="mb-2">
      <CardTitle className="flex justify-between">
        Productos Vendidos <ShoppingCart />
      </CardTitle>
      <CardDescription className="sr-only">
        Productos vendidos este mes
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-4xl">{380}</p>
      <p className="text-muted-foreground">+15% que el mes pasado</p>
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
  )
}