import { format } from "date-fns";

export async function getMonthlySales() {

  const startDate = format(new Date(), "yyyy-MM-01"); 
  const endDate = format(new Date(), "yyyy-MM-dd");   

  try {
    const response = await fetch(`/api/ventas?start=${startDate}&end=${endDate}`);
    if (!response.ok) {
      throw new Error("Error al obtener las ventas del mes");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error al obtener las ventas del mes:", error);
    return [];
  }
}

