import type { categories } from "@/data/categories";

export type Category = typeof categories[number];

export interface ProductDiscount {
  value: number;
  dueDate?: Date | null;
}

export interface Producto {
  id: number;
  name: string;
  stock: number;
  price: number;
  category: Category;
  createdAt: Date;
  dueDate: Date;
  discount?: ProductDiscount;
}

export interface ProductResponse {
  categoria:         null | string;
  codigo_barras?:     string;
  descripcion:       string;
  descuento:         null;
  estado_producto:   "activo" | "inactivo";
  fecha_registro?:    string;
  fecha_vencimiento: string;
  id_producto?:       number;
  nombre:            string;
  precio_venta:      string;
  stock:             number;
}