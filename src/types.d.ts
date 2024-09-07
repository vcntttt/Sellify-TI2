import { productosSchema } from "./schemas/schemas";
import { formaPagoSchema } from "./schemas/schemas";
import { descuentosSchema } from "./schemas/schemas";
import { categoriaSchema } from "./schemas/schemas";
import { precioSchema } from "./schemas/schemas";
import { usuarioSchema } from "./schemas/schemas";
import { historialPuntosSchema } from "./schemas/schemas";
import { tipoRegistroSchema } from "./schemas/schemas";
import { detalleRegistroSchema } from "./schemas/schemas";
import { registroSchema } from "./schemas/schemas";
import { stockSchema } from "./schemas/schemas";
import { puntosSchema } from "./schemas/schemas";
import { tipoUsuarioSchema } from "./schemas/schemas";
import { detallePagoSchema } from "./schemas/schemas";


export type productosSchema = z.infer<typeof productosSchema>
export type formaPagoSchema = z.infer<typeof formaPagoSchema>
export type descuentosSchema = z.infer<typeof descuentosSchema>
export type categoriaSchema = z.infer<typeof categoriaSchema>
export type precioSchema = z.infer<typeof precioSchema>
export type usuarioSchema = z.infer<typeof usuarioSchema>
export type historialPuntosSchema = z.infer<typeof historialPuntosSchema>
export type tipoRegistroSchema = z.infer<typeof tipoRegistroSchema>
export type detalleRegistroSchema= z.infer<typeof detalleRegistroSchema>
export type registroSchema = z.infer<typeof registroSchema>
export type stockSchema = z.infer<typeof stockSchema>
export type puntosSchema = z.infer<typeof puntosSchema>
export type tipoRegistroSchema = z.infer<typeof tipoRegistroSchema>
export type detallePagoSchema = z.infer<typeof detallePagoSchema>