import axios from "@/api/axios";
import { sleep } from "@/lib/utils";
import { UserResponse, UserTypeResponse } from "@/types/users";

export const getUsers = async (): Promise<UserResponse[]> => {
  await sleep(2);
  const response = await axios.get("/users").then((res) => res.data);
  return response;
};

export const getClients = async (): Promise<UserResponse[]> => {
  await sleep(4);
  const response = await axios.get("/users?tipo_usuario=cliente").then((res) => res.data);
  return response;
};

export const getUserTypes = async (): Promise<UserTypeResponse[]> => {
  const response = await axios.get("/tiposusuarios").then((res) => res.data);
  return response;
};

// export const addUser = async (userData: User): Promise<User> => {
//   await sleep(2);

//   const response = await axios.post<User>("/users", userData).then((res) => res.data);
  
//   return response
// };