import { useEffect, useMemo, useState } from "react";
import { useVentas } from "./query/use-ventas";
import { endOfDay, format, isWithinInterval, parseISO, startOfDay } from "date-fns";
import { Venta } from "@/types/ventas";

interface Props {
  start: Date;
  end: Date;
}

export function useTimeVentas({ start, end }: Props) {
  const { data } = useVentas();
  const [sales, setSales] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const normalizedStart = useMemo(() => startOfDay(start), [start]);
  const normalizedEnd = useMemo(() => endOfDay(end), [end]);

  const filteredSales = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter((venta: Venta) => {

      const saleDate = parseISO(format(new Date(venta.fecha_venta), "yyyy-MM-dd"));
      return isWithinInterval(saleDate, {
        start: normalizedStart,
        end: normalizedEnd,
      });
    });
  }, [data, normalizedStart, normalizedEnd]);

  useEffect(() => {
    if (!data) return;

    setIsLoading(true);

    setSales(filteredSales.length);

    setIsLoading(false);
  }, [filteredSales, data]);

  return { sales, isLoading, filteredSales };
}