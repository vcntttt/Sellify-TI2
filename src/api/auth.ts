import axios from "@/api/axios"; // Reutiliza la instancia configurada

export interface LoginResponse {
  user: {
    id_usuario: number;
    rut: string;
    nombre: string;
    role: string;
  };
  token: string;
}

export const login = async (rut: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post("/auth/login", { rut, password });
  return response.data;
};
