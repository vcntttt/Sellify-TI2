import axios from "axios";

export async function getTopFrecuentes() {
  try {
    const response = await axios.get("/api/top-users-by-sales"); 
    const data = response.data; 
    return data;
  } catch (error) {
    console.error("Error al obtener los clientes frecuentes:", error);
    throw new Error("No se pudo cargar la lista de clientes frecuentes.");
  }
}
