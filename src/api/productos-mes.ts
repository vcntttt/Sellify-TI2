import { format } from "date-fns";

export async function getMonthlyProducts() {
  const startDate = format(new Date(), "yyyy-MM-01");
  const endDate = format(new Date(), "yyyy-MM-dd");

  try {
    const response = await fetch(`/api/detalleventa?start=${startDate}&end=${endDate}`);
    if (!response.ok) {
      throw new Error("Error al obtener los productos vendidos del mes");
    }

    const data = await response.json();
    const totalCantidad = data.reduce((acc: number, venta: { cantidad: number }) => acc + venta.cantidad, 0);

    return totalCantidad;
  } catch (error) {
    console.error("Error al obtener los productos vendidos del mes:", error);
    return 0;
  }
}
