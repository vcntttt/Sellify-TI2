import axios from "@/api/axios";
import { sleep } from "@/lib/utils";
import { NewUserBody, UserResponse } from "@/types/users";

export const getUsers = async (): Promise<UserResponse[]> => {
  // await sleep(2);
  const response = await axios.get("/users").then((res) => res.data);
  return response;
};

export const getClients = async (): Promise<UserResponse[]> => {
  await sleep(4);
  const { data } = await axios.get("/users?tipo_usuario=cliente")
  return data;
};

export const registerUser = async (userData: NewUserBody): Promise<NewUserBody> => {
  const { data } = await axios.post<NewUserBody>("/register", userData);
  
  return data;
};