import { z } from "zod";
import { categories } from "@/data/categories";

export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(50),
  stock: z.number(),
  price: z.number(),
  category: z.enum(categories),
  createdAt: z.date(),
  dueDate: z.date(),
  discount: z.number().min(0).max(100),
});

export const usuarioSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  rut: z.string().min(1).max(12),
  password: z.string().min(6).max(50), // para los clientes usamos el rut noma
  name: z.string().min(1).max(50),
  apellido: z.string().min(1).max(50),
});

export const formaPagoSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1).max(50),
});

export const descuentosSchema = z.object({
  id: z.number(),
  id_producto: z.number(),
  porcentaje: z.number().min(0).max(100),
  fecha_inicial: z.date(),
  fecha_final: z.date(),
});

export const categoriaSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1).max(50),
  cantidad: z.number().min(0),
});

export const precioSchema = z.object({
  id: z.number(),
  fecha_inicial: z.date(),
  fecha_final: z.date(),
});

export const historialPuntosSchema = z.object({
  id: z.number(),
  id_cliente: z.number(),
  cantidad: z.number().min(0),
  fecha: z.date(),
});

export const tipoRegistroSchema = z.object({
  id: z.number(),
  descripcion: z.string().min(1).max(50),
});

export const detallePagoSchema = z.object({
  id: z.number(),
  id_producto: z.number(),
  id_formaPago: z.number(),
  total: z.number().min(0),
});

export const registroSchema = z.object({
  id: z.number(),
  descripcion: z.string().min(1).max(50),
  id_tipoRegistro: z.number(),
  id_cajero: z.number(),
  id_detalleRegistro: z.number(),
  id_pago: z.number(),
});

export const detalleRegistroSchema = z.object({
  id: z.number(),
  descripcion: z.string().min(1).max(50),
  fecha: z.date(),
  cantidad: z.number().min(0),
  id_tipoRegistro: z.number(),
  id_producto: z.number(),
});

export const stockSchema = z.object({
  id: z.number(),
  id_producto: z.number(),
  cantidad: z.number().min(0),
});

export const puntosSchema = z.object({
  id: z.number(),
  id_cliente: z.number(),
  cantidad: z.number().min(0),
});

export const tipoUsuarioSchema = z.object({
  id: z.number(),
  id_usuario: z.number(),
  tipo: z.string().min(1).max(50),
});
