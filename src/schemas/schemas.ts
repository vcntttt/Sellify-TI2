import { z } from "zod";



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
  
 
  export const productosSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1).max(50),
    precio: z.number().min(0),  
    fechaAgregado: z.date(),
    vencimiento: z.date(),
    categoria_id: z.number(),  
  });
  
 
  export const precioSchema = z.object({
    id: z.number(),
    fecha_inicial: z.date(),
    fecha_final: z.date(),
  });
  

  export const usuarioSchema = z.object({
    id: z.number(),
    correo: z.string().email(),  
    rut: z.string().min(1).max(12),  
    password: z.string().min(6).max(50),  
    nombre: z.string().min(1).max(50),
    apellido: z.string().min(1).max(50),
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

