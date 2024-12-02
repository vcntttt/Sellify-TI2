import React from "react"; // Importación correcta de React
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDatesForResponse } from "@/lib/utils";
import { getCompras } from "@/api/compra";
import { getAllSales } from "@/api/ventas";
import { Venta } from "@/types/ventas";
import { Compra } from "@/types/compras";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  Line,
} from "recharts";

export const description = "An interactive line chart";

const addOneDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
};

const getVentasComprasData = async () => {
  const ventas: Venta[] = await getAllSales();
  const compras: Compra[] = await getCompras();

  const dataMap: { [key: string]: { ventas: number; compras: number } } = {};

  // Procesar ventas
  ventas.forEach((v) => {
    const fecha = addOneDay(new Date(v.fecha_venta));
    const fechaFormateada = formatDatesForResponse(fecha);
    if (!dataMap[fechaFormateada]) {
      dataMap[fechaFormateada] = { ventas: 0, compras: 0 };
    }
    dataMap[fechaFormateada].ventas += v.total_con_iva;
  });

  // Procesar compras
  compras.forEach((c) => {
    const fecha = addOneDay(new Date(c.fecha_compra));
    const fechaFormateada = formatDatesForResponse(fecha);
    if (!dataMap[fechaFormateada]) {
      dataMap[fechaFormateada] = { ventas: 0, compras: 0 };
    }
    dataMap[fechaFormateada].compras += c.total_con_iva;
  });

  const chartData = Object.keys(dataMap)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((fecha) => ({
      date: fecha,
      ingresos: dataMap[fecha].ventas,
      gastos: dataMap[fecha].compras,
    }));

  return chartData;
};

const chartConfig: ChartConfig = {
  ingresos: {
    label: "Ingresos",
    color: "Green",
  },
  gastos: {
    label: "Gastos",
    color: "Red",
  },
};

export default function Component() {
  const [chartData, setChartData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await getVentasComprasData();
      setChartData(data);
    };
    loadData();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Balance de Ingresos/Gastos</CardTitle>
          <CardDescription className="sr-only">
            Balance de Ingresos/Gastos
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto w-full h-[200px]"
        >
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("es-CL", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("es-CL", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="ingresos"
              type="monotone"
              stroke={chartConfig.ingresos.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="gastos"
              type="monotone"
              stroke={chartConfig.gastos.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
