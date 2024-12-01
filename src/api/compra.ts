import axios from "axios";
import { Compra } from "@/types/compras";

export async function getCompras(): Promise<Compra[]> {
  try {

    const { data } = await axios.get("/api/compras");
    return data.map((item: any) => ({
      numero_documento: item.compra.numero_documento,
      fecha_compra: item.compra.fecha_compra,
      proveedor: item.compra.proveedor,
      total_con_iva: item.compra.total_con_iva,
      total_sin_iva: item.compra.total_sin_iva,
      productos: item.productos.map((producto: any) => ({
        nombre: producto.producto_nombre,
        cantidad: producto.cantidad,
        descripcion: producto.descripcion,
      })),
    }));
  } catch (error) {
    console.error("Error al obtener y adaptar las compras:", error);
    throw new Error("No se pudo cargar la lista de compras adaptadas.");
  }
}
