import { categories } from "@/data/categories";

// ------------------------- Productos -------------------------
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

// ------------------------- Usuarios -------------------------
export type Role = "admin" | "cashier" | "customer";

export interface User {
  id: number;
  name: string;
  role: Role;
}