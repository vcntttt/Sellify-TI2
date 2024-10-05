import { User } from "@/types/users";
import axios from "@/api/axios";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get("/users").then((res) => res.data);
  // setTimeout(() => {
  // }, 1000);
  return response;
};