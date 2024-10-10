// Tabla Principal
export interface Venta {
    id: number;
    cliente?: string
    formaPago: MetodoPago;
    tipoRegistro: TipoRegistro;
    total: number;
    detalleVentas: DetalleVenta[];
    fecha: Date
  }
  
  // Tabla Intermedia
  export interface DetalleVenta {
    id: number;
    id_producto: number;
    cantidad: number;
    subtotal: number;
  }
  
  export type MetodoPago = "efectivo" | "debito" | "credito";
  
  export type TipoRegistro = "boleta" | "factura";
