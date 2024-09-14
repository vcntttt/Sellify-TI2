import { categories } from "@/data/categories";

export type Category = typeof categories[number];

export interface ProductDiscount {
  value: number;
  dueDate: Date | null;
}

export interface Producto {
  id: number;
  name: string;
  stock: number;
  price: number;
  category: Category;
  createdAt?: Date;
  dueDate?: Date;
  discount: ProductDiscount;
}