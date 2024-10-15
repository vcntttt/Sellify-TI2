import axios from "@/api/axios";
import { ProductResponse } from "@/types/products";

export const getProducts = async (): Promise<ProductResponse[]> => {
  const {data} = await axios.get<ProductResponse[]>("/products");
  console.log("🚀 ~ getProducts ~ data:", data)
  
  return data;
};
