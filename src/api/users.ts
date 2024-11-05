import axios from "@/api/axios";
import {
  NewUserBody,
  UserResponse,
} from "@/types/users";
import { ShowNotification } from "@/components/NotificationProvider";
import { format } from "date-fns";

export const getUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await axios.get("/users").then((res) => res.data);

    const loadTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Usuarios cargados con éxito.", "success", loadTime);

    return response;
  } catch (error) {
    const errorMessage = "Error al cargar los usuarios.";
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification(errorMessage, "error", errorTime);
    throw error; 
  }
};

export const getClients = async (): Promise<UserResponse[]> => {
  try {
    const { data } = await axios.get("/users?tipo_usuario=cliente");

    const loadTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Clientes cargados con éxito.", "success", loadTime);

    return data;
  } catch (error) {
    const errorMessage = "Error al cargar los clientes.";
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification(errorMessage, "error", errorTime);
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

    const successTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Usuario registrado con éxito.", "success", successTime);

    return data;
  } catch (error) {
    const errorMessage = "Error al registrar el usuario.";
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification(errorMessage, "error", errorTime);
    throw error; 
  }
};
