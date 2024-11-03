import axios from "@/api/axios";
import { UserResponse } from "@/types/users";
import { showNotification } from "@/components/NotificationProvider";
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
    showNotification("Puntos agregados con éxito.", "success", loadTime);

    return response.data;
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    showNotification("Error al agregar puntos.", "error", errorTime); 
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
    showNotification("Puntos actualizados con éxito.", "success", loadTime);

    return response.data;
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    showNotification("Error al actualizar puntos.", "error", errorTime); 
    throw error; 
  }
};
