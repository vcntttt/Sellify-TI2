import { format, startOfWeek } from "date-fns";
import {
  ToSaveVenta,
  Venta,
} from "@/types/ventas";
import axios from "@/api/axios";

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

export async function getWeekSales() {
  const startDate = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd"); 
  const endDate = format(new Date(), "yyyy-MM-dd"); 

  try {
    const response = await fetch(`/api/ventas?start=${startDate}&end=${endDate}`);
    if (!response.ok) {
      throw new Error("Error al obtener las ventas de la semana");
    }

    const data = await response.json();
    console.log(data)
    return data; 
  } catch (error) {
    console.error("Error al obtener las ventas de la semana:", error);
    return [];
  }
}

export async function getAllSales() {
  try {
    const {data} = await axios(`/boletas`);
    const ventas = data.map((data : any) => {
      return {
        ...data.venta,
        productos: data.productos,
      };
    });

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
