export type Compra = {
    fecha_compra: string;
    id_compra: number;
    numero_documento: string;
    proveedor: string;
    total_con_iva: number;
    total_sin_iva: number;
    productos: {
      cantidad: number;
      descripcion: string;
      producto_nombre: string;
    }[];
  };