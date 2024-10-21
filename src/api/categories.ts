import axios from "@/api/axios";
import { CategoryResponse } from "@/types/products";

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get("/categories").then((res) => res.data);
  return response.map(
    (category: CategoryResponse) => category.nombre_categoria
  );
};

export const addCategory = async (category: string) => {
  const { data } = await axios.post<CategoryResponse>("/categories", {
    nombre_categoria: category,
  });
  return data;
};
