import { LoginData, LoginResponse, UserResponse } from "@/types/users";
import axios from "@/api/axios";
import { ShowNotification } from "@/components/NotificationProvider";
import { format } from "date-fns";

export const login = async (loginData: LoginData) => {
  try {
    ShowNotification("Iniciando sesión...", "info");

    const { data: token } = await axios.post<LoginResponse>("/login", loginData);
    const { access_token } = token;

    const loginTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Inicio de sesión exitoso!", "success", loginTime);

    const { data: info } = await axios.get<UserResponse>(`/users/${loginData.rut}`);
    ShowNotification("Información del usuario cargada.", "info");

    return { token: access_token, info };
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Error al iniciar sesión.", "error", errorTime);
    throw error;
  }
};
