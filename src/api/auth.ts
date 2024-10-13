import axios from "axios";

interface LoginData {
  rut: string;
  contrasena: string;
}

interface LoginResponse {
  access_token: string;
  rol: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axios.post("/api/login", data, {
    withCredentials: true, 
  });
  return response.data;
};
