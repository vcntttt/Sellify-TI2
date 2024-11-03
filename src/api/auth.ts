import { LoginData, LoginResponse, UserResponse } from "@/types/users";
import axios from "@/api/axios";
import { showNotification } from "@/components/NotificationProvider";
import { format } from "date-fns";

export const login = async (loginData: LoginData) => {
  try {
    showNotification("Iniciando sesión...", "info");

    const { data: token } = await axios.post<LoginResponse>("/login", loginData);
    const { access_token } = token;

    const loginTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    showNotification("Inicio de sesión exitoso!", "success", loginTime);

    const { data: info } = await axios.get<UserResponse>(`/users/${loginData.rut}`);
    showNotification("Información del usuario cargada.", "info");

    return { token: access_token, info };
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    showNotification("Error al iniciar sesión.", "error", errorTime);
    throw error;
  }
};
