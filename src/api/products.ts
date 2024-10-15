import axios from "@/api/axios";
import { Category, Producto, ProductResponse } from "@/types/products";

function responseToProduct(productResponse: ProductResponse): Producto {
  return {
    id: productResponse.id_producto,
    name: productResponse.nombre,
    stock: productResponse.stock,
    price: parseFloat(productResponse.precio_venta),
    category: productResponse.categoria as Category,
    createdAt: new Date(productResponse.fecha_registro),
    dueDate: new Date(productResponse.fecha_vencimiento),
    discount: productResponse.descuento ? { value: parseFloat(productResponse.descuento) } : undefined,
  };
}

export const getProducts = async (): Promise<Producto[]> => {
  const {data} = await axios.get<ProductResponse[]>("/products");
  console.log("🚀 ~ getProducts ~ data:", data)
  
  return data.map(responseToProduct);
};
