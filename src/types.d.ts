import { productosSchema } from "./schemas/schemas";
import { formaPagoSchema } from "./schemas/schemas";
import { descuentosSchema } from "./schemas/schemas";
import { categoriaSchema } from "./schemas/schemas";
import { usuarioSchema } from "./schemas/schemas";
import { historialPuntosSchema } from "./schemas/schemas";
import { tipoRegistroSchema } from "./schemas/schemas";
import { detalleRegistroSchema } from "./schemas/schemas";
import { registroSchema } from "./schemas/schemas";
import { puntosSchema } from "./schemas/schemas";
import { detallePagoSchema } from "./schemas/schemas";

export type Productos = z.infer<typeof productosSchema>
export type Usuario = z.infer<typeof usuarioSchema>
export type FormaPago = z.infer<typeof formaPagoSchema>
export type Descuentos= z.infer<typeof descuentosSchema>
export type Categoria = z.infer<typeof categoriaSchema>
export type HistorialPuntos = z.infer<typeof historialPuntosSchema>
export type TipoRegistro = z.infer<typeof tipoRegistroSchema>
export type DetalleRegistro= z.infer<typeof detalleRegistroSchema>
export type Registro = z.infer<typeof registroSchema>
export type Puntos = z.infer<typeof puntosSchema>
export type TipoRegistro = z.infer<typeof tipoRegistroSchema>
export type DetallePago = z.infer<typeof detallePagoSchema>

// export type precio = z.infer<typeof precioSchema>
// export type stock = z.infer<typeof stockSchema>