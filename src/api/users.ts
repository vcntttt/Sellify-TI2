import axios from "@/api/axios";
// import { sleep } from "@/lib/utils";
import {
  NewUserBody,
  UserResponse,
} from "@/types/users";
import { showNotification } from "@/components/NotificationProvider";

export const getUsers = async (): Promise<UserResponse[]> => {
  try {
    // const response = await sleep(2); 
    const response = await axios.get("/users").then((res) => res.data);

    showNotification("Usuarios cargados con éxito.", );

    return response;
  } catch (error) {
    const errorMessage = "Error al cargar los usuarios.";
    showNotification(errorMessage, ); 
    throw error; 
  }
};

export const getClients = async (): Promise<UserResponse[]> => {
  try {
    // const response = await sleep(4); 
    const { data } = await axios.get("/users?tipo_usuario=cliente");

    showNotification("Clientes cargados con éxito.",);

    return data;
  } catch (error) {
    const errorMessage = "Error al cargar los clientes.";
    showNotification(errorMessage,); 
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

    showNotification("Usuario registrado con éxito.", );

    return data;
  } catch (error) {
    const errorMessage = "Error al registrar el usuario.";
    showNotification(errorMessage, ); 
    throw error; 
  }
};