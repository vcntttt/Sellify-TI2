import { User } from "@/types/users";
import axios from "@/api/axios";
import { sleep } from "@/lib/utils";

export const getUsers = async (): Promise<User[]> => {
  await sleep(4);
  const response = await axios.get("/users").then((res) => res.data);
  return response;
};

export const addUser = async (userData: User): Promise<User> => {
  await sleep(2);

  const response = await axios.post<User>("/users", userData).then((res) => res.data);
  
  return response
};