import axios from "@/api/axios";
import { sleep } from "@/lib/utils";
import {
  LoginData,
  LoginResponse,
  NewUserBody,
  UserResponse,
} from "@/types/users";

export const getUsers = async (): Promise<UserResponse[]> => {
  await sleep(2);
  const response = await axios.get("/users").then((res) => res.data);
  return response;
};

export const getClients = async (): Promise<UserResponse[]> => {
  // await sleep(4);
  const { data } = await axios.get("/users?tipo_usuario=cliente");
  return data;
};

export const registerUser = async (
  userData: NewUserBody
): Promise<NewUserBody> => {
  const fixedData = {
    ...userData,
    estado: "activo",
  };
  const { data } = await axios.post<NewUserBody>("/register", fixedData);

  return data;
};

export const login = async (loginData: LoginData) => {
  const { data: token } = await axios.post<LoginResponse>("/login", loginData);
  const { data: info } = await axios.get<UserResponse>(
    `/users/${loginData.rut}`
  );
  const { access_token } = token; // desestructuracion (objeto -> string)
  return { token: access_token, info };
};
