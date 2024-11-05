import axios from "@/api/axios";
import {
  formatDatesForResponse,
  priceToInt,
  formatDatesFromResponse,
} from "@/lib/utils";
import {
  EditProductBody,
  NewProductBody,
  Producto,
  ProductResponse,
} from "@/types/products";
import { showNotification } from "@/components/NotificationProvider"; 
import { format } from "date-fns"; 

function responseToProduct(productResponse: ProductResponse): Producto {
  const product: Producto = {
    id: productResponse.id_producto,
    name: productResponse.nombre,
    stock: productResponse.stock,
    price: priceToInt(productResponse.precio_venta),
    category: productResponse.categoria,
    createdAt: formatDatesFromResponse(productResponse.fecha_registro),
    dueDate: formatDatesFromResponse(productResponse.fecha_vencimiento),
    codigoBarras: productResponse.codigo_barras,
    description: productResponse.descripcion,
  };
  if (productResponse.descuento) {
    product.discount = {
      value: parseFloat(productResponse.descuento),
      dueDate: productResponse.vencimiento_descuento
        ? formatDatesFromResponse(productResponse.vencimiento_descuento)
        : undefined,
    };
  }
  return product;
}

function productToResponse(product: Producto): NewProductBody {
  const response: NewProductBody = {
    nombre: product.name,
    fecha_vencimiento: formatDatesForResponse(new Date(product.dueDate)),
    stock: product.stock,
    precio_venta: product.price,
    categoria: product.category,
    estado: "activo",
    descripcion: product.description,
  };

  if (product.discount?.value && product.discount?.dueDate) {
    response.descuento = product.discount.value;
    response.vencimiento_descuento = formatDatesForResponse(
      new Date(product.discount.dueDate)
    );
  }

  if (product.codigoBarras) {
    response.codigo_barras = product.codigoBarras;
  }

  return response;
}

export const getProducts = async (): Promise<Producto[]> => {
  try {
    const { data } = await axios.get<ProductResponse[]>("/products");
    const loadTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    showNotification("Productos cargados con éxito.", "success", loadTime); 
    return data.map(responseToProduct);
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    showNotification("Error al cargar los productos.", "error", errorTime); 
    throw error; 
  }
};

export const editProduct = async (product: Producto) => {
  const editedProduct: EditProductBody = productToResponse(product);
  console.log("🚀 ~ editProduct ~ editedProduct:", editedProduct);

  try {
    const { data } = await axios.put<ProductResponse>(
      `/product/barcode/${editedProduct.codigo_barras}`,
      editedProduct
    );
    
    const successTime = format(new Date(), "dd/MM/yyyy HH:mm:ss"); 
    showNotification("Producto editado con éxito.", "success", successTime); 
    return data;
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss"); 
    showNotification("Error al editar el producto.", "error", errorTime);
    throw error; 
  }
};

export const addProduct = async (product: Producto) => {
  const newProduct: EditProductBody = productToResponse(product);

  try {
    const { data } = await axios.post<ProductResponse>("/product", newProduct);
    
    const successTime = format(new Date(), "dd/MM/yyyy HH:mm:ss"); 
    showNotification("Producto agregado con éxito.", "success", successTime); 
    return data;
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss"); 
    showNotification("Error al agregar el producto.", "error", errorTime); 
    throw error; 
  }
};
