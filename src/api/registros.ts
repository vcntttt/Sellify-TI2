import axios from "@/api/axios";
import { SaveRegistro } from "@/types/registro";

export async function getRegistros() {
  try {
    const { data } = await axios.get("/registros");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener los registros:", error);
  }
}

export async function saveRegistro(registro: SaveRegistro) {
  try {
    const { data } = await axios.post("/registros", registro);
    return data;
  } catch (error) {
    console.error("Error al guardar el registro:", error);
  }
}