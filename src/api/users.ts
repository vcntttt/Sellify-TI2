import axios from "@/api/axios";
import {
  NewUserBody,
  UserResponse,
} from "@/types/users";
import { showNotification } from "@/components/NotificationProvider";

export const getUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await axios.get("/users").then((res) => res.data);

    showNotification("Usuarios cargados con éxito.", "success");

    return response;
  } catch (error) {
    const errorMessage = "Error al cargar los usuarios.";


    showNotification(errorMessage, "error");
    throw error; 
  }
};

export const getClients = async (): Promise<UserResponse[]> => {
  try {
    const { data } = await axios.get("/users?tipo_usuario=cliente");

    showNotification("Clientes cargados con éxito.", "success");

    return data;
  } catch (error) {
    const errorMessage = "Error al cargar los clientes.";

    showNotification(errorMessage, "error");
    throw error;
  }
};

export const registerUser = async (
  userData: NewUserBody
): Promise<NewUserBody> => {
  try {
    const fixedData = {
      ...userData,
      estado: "activo",
    };
    const { data } = await axios.post<NewUserBody>("/register", fixedData);

    
    showNotification("Usuario registrado con éxito.", "success");

    return data;
  } catch (error) {
    const errorMessage = "Error al registrar el usuario.";

    showNotification(errorMessage, "error");
    throw error; 
  }
};
