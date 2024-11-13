import { format } from "date-fns";

export async function getTop5Products() {
  const startDate = format(new Date(), "yyyy-MM-01");
  const endDate = format(new Date(), "yyyy-MM-dd");

  try {
    const response = await fetch(`/api/detalleventa?start=${startDate}&end=${endDate}`);
    if (!response.ok) {
      throw new Error("Error al obtener los productos más vendidos del mes");
    }

    const data = await response.json();

    const topProducts = data
      .sort((a: { cantidad: number }, b: { cantidad: number }) => b.cantidad - a.cantidad)
      .slice(0, 5);

    return topProducts;
  } catch (error) {
    console.error("Error al obtener los productos más vendidos:", error);
    return [];
  }
}
