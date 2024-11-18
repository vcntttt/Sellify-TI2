// Tabla Principal
export interface Venta {
  id_cliente: number;  
  id_cajero: number;  
  total_sin_iva: number;  
  total_con_iva: number;  
  fecha_venta: string;  
  numero_documento: string; 
  porcentaje: number;  
  id_forma_pago: MetodoPago;  
  id_tipodocumento: TipoRegistro;  
  detalleVentas: DetalleVenta[];  
}

// Tabla Intermedia
export interface DetalleVenta {
  id: number;
  id_producto: number; 
  cantidad: number;  
  subtotal: number;  
}

// Tipo de Método de Pago
export type MetodoPago = "efectivo" | "debito" | "credito" | "Puntos";

// Tipo de Registro (Boleta o Factura)
export type TipoRegistro = "boleta" | "factura";
