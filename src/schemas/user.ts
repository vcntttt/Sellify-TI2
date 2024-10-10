import { roles } from "@/data/roles";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  rut: z.string().min(8).max(9),
  apellido: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().min(9).max(9),
  password: z.string().min(6).max(50), // para los clientes usamos el rut noma
  role: z.enum(roles),
});