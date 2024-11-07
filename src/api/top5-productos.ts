import axios from "axios";

interface Product {
  id: number;
  nombre: string;
  cantidadVendida: number;
}

export async function getTop5Products(): Promise<Product[]> {
  try {
    const response = await axios.get("/api/"); //modificar api
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos más vendidos:", error);
    throw error;
  }
}
