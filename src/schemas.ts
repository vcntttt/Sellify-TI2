import { z } from "zod";
import { categories } from "@/data/categories";

export const productSchema = z.object({
  id: z.number(),
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

export const userSchema = z.object({
  rut: z.string(),
  name: z.string().min(1).max(50),
  apellido: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50), // para los clientes usamos el rut noma
  role: z.enum(["admin", "cashier", "customer"]),
});