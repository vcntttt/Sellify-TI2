export interface ProductDiscount {
  value: number;
  dueDate?: Date | null | string;
}

export interface Producto {
  id: number;
  name: string;
  stock: number;
  price: string | number;
  category: string;
  createdAt: Date | string;
  dueDate: Date | string;
  discount?: ProductDiscount;
  codigoBarras?: string;
}

export interface ProductResponse {
  categoria:         string;
  codigo_barras:     string;
  descripcion:       string;
  descuento:         null;
  estado_producto:   "activo" | "inactivo";
  fecha_registro:    Date | string;
  fecha_vencimiento: Date | string;
  id_producto:       number;
  nombre:            string;
  precio_venta:      string | number;
  stock:             number;
  vencimiento_descuento: null | string | Date;
  descuento:             null | string;
}

export interface EditProductBody {
  nombre:            string;
  descripcion?:       string;
  fecha_vencimiento: Date | string;
  stock:             number;
  precio_venta:      string | number;
  estado:            string;
  categoria:         string;
  descuento?:         number;
  vencimiento_descuento?: Date | string;
}

export interface NewProductBody extends EditProductBody {
  codigo_barras?: string;
}

export interface CategoryResponse {
  id_categoria:     number;
  nombre_categoria: string;
}
