import { format } from "date-fns";
import {
  ToSaveVenta,
  Venta,
} from "@/types/ventas";
import axios from "@/api/axios";
import { formatDatesFromResponse } from "@/lib/utils";

export async function getAllSales() {
  try {
    const {data} = await axios(`/boletas`);
    const ventas : Venta[] = data.map((data : any) => {
      return {
        ...data.venta,
        fecha_venta: formatDatesFromResponse(new Date(data.venta.fecha_venta)),
        productos: data.productos,
      };
    });
    console.log("🚀 ~ getAllSales ~ ventas:", ventas);

    return ventas
  } catch (error) {
    console.error("Error al obtener todas las ventas:", error);
    return [];
  }
}

export const AddVenta = async (venta: ToSaveVenta): Promise<Venta> => {
  try {
    const { data } = await axios.post<Venta>("/ventas-detalle", venta);

    const successTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    console.log("Venta registrada con éxito.", "success", successTime);

    return data;
  } catch (error) {
    const errorMessage = "Error al registrar la venta.";
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    console.error(errorMessage, "error", errorTime);
    throw error;
  }
};
