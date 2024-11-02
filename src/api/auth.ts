import { LoginData, LoginResponse, UserResponse } from "@/types/users";
import axios from "@/api/axios";
import { showNotification } from "@/components/NotificationProvider"; 

export const login = async (loginData: LoginData) => {
  try {
    showNotification("Iniciando sesión...");

    const { data: token } = await axios.post<LoginResponse>("/login", loginData);
    const { access_token } = token; 
    showNotification("Inicio de sesión exitoso!", );

    const { data: info } = await axios.get<UserResponse>(`/users/${loginData.rut}`);

    showNotification("Información del usuario cargada.", );

    return { token: access_token, info };
  } catch (error) {
    const errorMessage = "Error al iniciar sesión.";
    showNotification(errorMessage, ); 
    throw error; 
  }
};