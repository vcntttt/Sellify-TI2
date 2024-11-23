import { format, startOfMonth, endOfMonth } from "date-fns";
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
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  vencidos: {
    label: "Vencidos",
    color: "hsl(var(--chart-1))",
  },
  no_vencidos: {
    label: "No vencidos",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

interface ChartProductData {
  data: Producto[]
}

export function ChartProductos({ data }: ChartProductData) {
  const now = new Date();
  const startDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
  const endDate = format(endOfMonth(new Date()), "yyyy-MM-dd");

  const vencidos = data
    .filter((producto) => producto.dueDate && new Date(producto.dueDate) <= now)
    .reduce((total, producto) => total + producto.stock, 0);

  const noVencidos = data
    .filter(
      (producto) =>
        producto.dueDate &&
        new Date(producto.dueDate) > now &&
        new Date(producto.dueDate) >= new Date(startDate) &&
        new Date(producto.dueDate) <= new Date(endDate)
    )
    .reduce((total, producto) => total + producto.stock, 0);

  const chartData = [
    { name: "Vencidos", value: vencidos, fill: chartConfig.vencidos.color },
    { name: "No Vencidos", value: noVencidos, fill: chartConfig.no_vencidos.color }
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Productos vencidos/no vencidos</CardTitle>
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
          {`Total Productos: ${vencidos + noVencidos}`} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Datos del mes actual
        </div>
      </CardFooter>
    </Card>
  )
}

