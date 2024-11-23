import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { Producto } from "@/types/products"
import { Venta } from "@/types/ventas"
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  vencidos: {
    label: "Vencidos sin vender",
    color: "hsl(var(--chart-1))",
  },
  Vendidos: {
    label: "Vendidos",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

interface ChartProductData {
  data: Producto[]
  ventas: Venta[]
}

export function ChartProductos({ data, ventas }: ChartProductData) {
  const now = new Date();

  const vencidos = data
    .filter((producto) => producto.dueDate && new Date(producto.dueDate) <= now)
    .reduce((total, producto) => total + producto.stock, 0);

  const vendidos = ventas.reduce((totalVentas, venta) => {
    const totalDetalle = venta.detalleVentas.reduce(
      (subtotal, detalle) => subtotal + detalle.cantidad,
      0
    );
    return totalVentas + totalDetalle;
  }, 0);

  const chartData = [
    { name: "Vencidos", value: vencidos, fill: chartConfig.vencidos.color },
    { name: "Vendidos", value: vendidos, fill: chartConfig.Vendidos.color }
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Productos vencidos/vendidos</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {`Total Productos: ${vencidos + vendidos}`} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Datos del mes actual
        </div>
      </CardFooter>
    </Card>
  )
}

