import { LoginData, LoginResponse, UserResponse } from "@/types/users";
import axios from "@/api/axios";
import { showNotification } from "@/components/NotificationProvider"; 

export const login = async (loginData: LoginData) => {
  try {
    showNotification("Iniciando sesión...", "info",);

  
    const { data: token } = await axios.post<LoginResponse>("/login", loginData);
    const { access_token } = token; 

    showNotification("Inicio de sesión exitoso!", "success");

    const { data: info } = await axios.get<UserResponse>(`/users/${loginData.rut}`);

    showNotification("Información del usuario cargada.", "info");

    return { token: access_token, info };
  } catch (error) {
    showNotification("Error al iniciar sesión.", "error");
    throw error; 
  }
};
