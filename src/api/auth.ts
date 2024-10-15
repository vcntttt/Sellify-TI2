import { LoginData, LoginResponse, UserResponse } from "@/types/users";
import axios from "@/api/axios";

export const login = async (loginData: LoginData) => {
  const { data: token } = await axios.post<LoginResponse>("/login", loginData);
  const { data: info } = await axios.get<UserResponse>(
    `/users/${loginData.rut}`
  );
  const { access_token } = token; // desestructuracion (objeto -> string)
  return { token: access_token, info };
};
