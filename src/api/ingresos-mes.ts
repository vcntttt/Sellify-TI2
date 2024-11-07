import axios from "axios";

interface Venta {
  total_con_iva: number;
}
//no funciona todavia
export async function getMonthlyRevenue(): Promise<number> {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split("T")[0];
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split("T")[0];

  try {
    const response = await axios.get("/ventas", {
      params: {
        fecha_inicio: startDate,
        fecha_fin: endDate,
      },
    });

    const ventas = response.data as Venta[];

    if (!ventas || ventas.length === 0) {
      return 0;
    }
    const totalRevenue = ventas.reduce((sum: number, venta: Venta) => sum + (venta.total_con_iva || 0), 0);

    return totalRevenue;
  } catch (error) {
    console.error("Error al obtener el total de ingresos:", error);
    throw error;
  }
}
