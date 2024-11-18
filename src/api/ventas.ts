import { format, subDays } from "date-fns";
import {
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

  const startDate = format(subDays(new Date(),7), "yyyy-MM-dd"); 
  const endDate = format(new Date(), "yyyy-MM-dd");   

  try {
    const response = await fetch(`/api/ventas?start=${startDate}&end=${endDate}`);
    if (!response.ok) {
      throw new Error("Error al obtener las ventas de la semana");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error al obtener las ventas de la semana:", error);
    return [];
  }
}

export async function getAllSales() {
  try {
    const response = await fetch(`/api/boletas`);
    if (!response.ok) {
      throw new Error("Error al obtener todas las ventas");
    }

    const data = await response.json();

    const ventas = Array.isArray(data)
      ? data.map((item) => ({
          ...item.venta,
          productos: item.productos, 
        }))
      : [
          {
            ...data.venta,
            productos: data.productos,
          },
        ];

    return ventas;
  } catch (error) {
    console.error("Error al obtener todas las ventas:", error);
    return [];
  }
}

export const AddVenta = async (venta: Venta): Promise<Venta> => { // para prueba
  try {
    const { data } = await axios.post<Venta>("/ventas", venta);

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
