import { format } from "date-fns";

export async function getMonthlyRevenue() {
  const startDate = format(new Date(), "yyyy-MM-01");
  const endDate = format(new Date(), "yyyy-MM-dd");

  try {
    const response = await fetch(`/api/ventas?start=${startDate}&end=${endDate}`);
    if (!response.ok) {
      throw new Error("Error al obtener los ingresos del mes");
    }

    const data = await response.json();
    const totalRevenue = data.reduce((acc: number, sale: { total_con_iva: number }) => acc + sale.total_con_iva, 0);

    return totalRevenue;
  } catch (error) {
    console.error("Error al obtener los ingresos del mes:", error);
    return 0;
  }
}
