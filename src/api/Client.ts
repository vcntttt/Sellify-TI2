import axios from "@/api/axios";
import { UserResponse } from "@/types/users";
import { ShowNotification } from "@/components/NotificationProvider";
import { format } from "date-fns";

export const addPoints = async (
  rut: string,
  puntos: number
): Promise<UserResponse> => {
  try {
    const response = await axios.post("/puntos", {
      rut,
      puntos,
    });

    const loadTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Puntos agregados con éxito.", "success", loadTime);

    return response.data;
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Error al agregar puntos.", "error", errorTime); 
    throw error; 
  }
};

export const updateUserPoints = async (
  rut: string,
  puntos: number
): Promise<UserResponse> => {
  try {
    const response = await axios.put(`/users/${rut}/puntos`, {
      puntos,
    });

    const loadTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Puntos actualizados con éxito.", "success", loadTime);

    return response.data;
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Error al actualizar puntos.", "error", errorTime); 
    throw error; 
  }
};



export const getTopPuntos = async (): Promise<UserResponse[]> => {
  try {
    const response = await axios.get("/users/puntos"); //modificar 
    const loadTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Clientes con más puntos cargados.", "success", loadTime);
    return response.data;
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Error al cargar clientes con más puntos.", "error", errorTime);
    throw error;
  }
};

export const getTopFrecuentes = async (): Promise<UserResponse[]> => {
  try {
    const response = await axios.get("/users/frecuentes"); // modificar
    const loadTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Clientes más frecuentes cargados.", "success", loadTime);
    return response.data;
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Error al cargar clientes más frecuentes.", "error", errorTime);
    throw error;
  }
};
