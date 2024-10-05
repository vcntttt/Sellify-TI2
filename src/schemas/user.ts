import { z } from "zod";

export const userSchema = z.object({
  rut: z.string(),
  name: z.string().min(0).max(50),
  apellido: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string().min(6).max(50), // para los clientes usamos el rut noma
  role: z.enum(["admin", "cashier", "customer", ""]),
});