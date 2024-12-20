export interface ProductDiscount {
  value: number;
  dueDate?: Date | null;
}

export interface Producto {
  id: number;
  name: string;
  stock: number;
  price: string | number;
  category: string;
  createdAt: Date;
  dueDate: Date;
  discount?: ProductDiscount;
  codigoBarras?: string;
  description?: string;
}

export interface ToSellProduct {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number
  totalPrice: number
  codigoBarras: string;
  iva: number
  discountValue: number
  discountedPrice: number
  originalPrice: number
}

export interface ProductResponse {
  categoria:         string;
  codigo_barras:     string;
  descripcion:       string;
  descuento:         null;
  estado_producto:   "activo" | "inactivo";
  fecha_registro:    string;
  fecha_vencimiento: string;
  id_producto:       number;
  nombre:            string;
  precio_venta:      string | number;
  stock:             number;
  vencimiento_descuento: null | string;
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
  codigo_barras?: string;
}

export interface NewProductBody extends EditProductBody {
  codigo_barras?: string;
}

export interface CategoryResponse {
  id_categoria:     number;
  nombre_categoria: string;
}
