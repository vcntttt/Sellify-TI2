import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Top5ProductsCard() {
  return (
    <Card className="h-full flex-col flex justify-between">
    <CardHeader>
      <CardTitle className="flex justify-between">
        Productos mas vendidos <ShoppingCart />
      </CardTitle>
      <CardDescription className="sr-only">
        Ventas del mes
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ol className="list-decimal pl-4 space-y-2">
        <li className="flex items-center">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
            1
          </span>
          Auriculares Premium
        </li>
        <li className="flex items-center">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
            2
          </span>
          Teclado Inalámbrico
        </li>
        <li className="flex items-center">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
            3
          </span>
          Monitor 4K
        </li>
        <li className="flex items-center">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
            4
          </span>
          Ratón Ergonómico
        </li>
        <li className="flex items-center">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2">
            5
          </span>
          Soporte para Portátil
        </li>
      </ol>
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