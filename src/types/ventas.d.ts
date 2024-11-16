export interface Venta {
  id: number;
  cliente?: string;
  formaPago: MetodoPago;
  tipoRegistro: TipoRegistro;
  total: number;
  fecha: Date;
  numero_documento: string; // Agregar el número de documento (boleta)
  productos: Producto[]; // Lista de productos vendidos
}

export interface Producto {
  nombre: string;
  cantidad: number;
  descripcion?: string;
  precioUnitario?: number; // Precio unitario (opcional si no se utiliza)
  subtotal?: number; // Total por producto (opcional si no se utiliza)
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
