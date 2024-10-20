import axios from "@/api/axios";
import { sleep } from "@/lib/utils";
import {
  EditProductBody,
  NewProductBody,
  Producto,
  ProductResponse,
} from "@/types/products";

function responseToProduct(productResponse: ProductResponse): Producto {
  const product: Producto = {
    id: productResponse.id_producto,
    name: productResponse.nombre,
    stock: productResponse.stock,
    price: productResponse.precio_venta,
    category: productResponse.categoria,
    createdAt: new Date(productResponse.fecha_registro),
    dueDate: new Date(productResponse.fecha_vencimiento),
    codigoBarras: productResponse.codigo_barras,
    description: productResponse.descripcion,
  };
  if (productResponse.descuento) {
    product.discount = {
      value: parseFloat(productResponse.descuento),
      dueDate: productResponse.vencimiento_descuento
        ? new Date(productResponse.vencimiento_descuento)
        : undefined,
    };
  }

  return product;
}

function productToResponse(product: Producto): NewProductBody {
  const response: NewProductBody = {
    nombre: product.name,
    fecha_vencimiento: product.dueDate,
    stock: product.stock,
    precio_venta: product.price,
    categoria: product.category,
    estado: "activo",
    descripcion: product.description,
  };

  if (product.discount?.value && product.discount?.dueDate) {
    response.descuento = product.discount.value;
    response.vencimiento_descuento = product.discount.dueDate;
  }
  if (product.codigoBarras) {
    response.codigo_barras = product.codigoBarras;
  }

  return response;
}

export const getProducts = async (): Promise<Producto[]> => {
  await sleep(2)
  const { data } = await axios.get<ProductResponse[]>("/products");

  return data.map(responseToProduct);
};

export const editProduct = async (product: Producto) => {
  const editedProduct: EditProductBody = productToResponse(product);

  const { data } = await axios.put<ProductResponse>(
    `/product/barcode/${editedProduct.codigo_barras}`,
    editedProduct
  );
  return data;
};

export const addProduct = async (product: Producto) => {
  const newProduct: EditProductBody = productToResponse(product);

  const { data } = await axios.post<ProductResponse>("/product", newProduct);
  return data;
};
