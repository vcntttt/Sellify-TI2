import axios from "@/api/axios";
import { CategoryResponse } from "@/types/categorie";

export const getCategories = async (): Promise<CategoryResponse[]> => {
  const response = await axios.get("/categories").then((res) => res.data);
  return response;
};
