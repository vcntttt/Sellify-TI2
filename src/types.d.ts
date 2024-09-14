import { categories } from "@/data/categories";

export interface Productos {
  id: number;
  name: string;
  stock: number;
  price: number;
  category: typeof categories[number];
  createdAt: Date;
  dueDate: Date;
  discount: {
    value: number;
    dueDate: Date | null;
  }
}