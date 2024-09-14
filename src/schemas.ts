import { z } from "zod";
import { categories } from "@/data/categories";

export const productSchema = z.object({
  name: z.string().min(2).max(50),
  stock: z.preprocess((val) => (typeof val === 'string' ? parseInt(val, 10) : val), z.number().min(0)),
  price: z.preprocess((val) => (typeof val === 'string' ? parseInt(val, 10) : val), z.number().min(0)),
  category: z.enum(categories),
  // createdAt: z.date(),
  // dueDate: z.date(),
  discount: z.object({
    value: z.preprocess((val) => (typeof val === 'string' ? parseInt(val, 10) : val), z.number().min(0).max(100)),
    dueDate: z.date({ required_error: "Debe ingresar una fecha de vencimiento de descuento" })
  })
});