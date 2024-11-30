export interface DetalleVenta {
  id: number;
  id_producto: number; 
  cantidad: number;  
  subtotal: number;  
}

export type MetodoPago = "efectivo" | "debito" | "credito" | "Puntos";

export type TipoDocumento = "boleta" | "factura";

export interface DetalleProducto{
  id_producto: number;
  cantidad: number;
}

export interface ToSaveVenta {
  id_cliente?: number;
  id_cajero: number;
  total_sin_iva: number;
  total_con_iva: number;
  fecha_venta: string;
  numero_documento: string;
  porcentaje?: number;
  id_forma_pago: number
  id_tipodocumento: number;
  productos: DetalleProducto[];
}

export interface Venta {
  productos: Producto[];
  cajero:           string;
  cliente:          string;
  fecha_venta:      string;
  forma_pago:       MetodoPago;
  id_venta:         number;
  numero_documento: string;
  porcentaje:       string;
  tipo_documento:   TipoDocumento;
  total_con_iva:    number;
  total_sin_iva:    number;
}

export interface Producto {
  cantidad:          number;
  descripcion:       string;
  fecha_vencimiento: string;
  nombre:            string;
}