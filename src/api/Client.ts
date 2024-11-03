import axios from "@/api/axios";
import { UserResponse } from "@/types/users";
import { showNotification } from "@/components/NotificationProvider";

export const addPoints = async (
  rut: string,
  puntos: number
): Promise<UserResponse> => {
  try {
    const response = await axios.post("/puntos", {
      rut,
      puntos,
    });

    showNotification("Puntos agregados con éxito.", "success");

    return response.data;
  } catch (error) {
    showNotification("Error al agregar puntos.", "error"); 
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

    showNotification("Puntos actualizados con éxito.", "success");

    return response.data;
  } catch (error) {
    showNotification("Error al actualizar puntos.", "error"); 
    throw error; 
  }
};
