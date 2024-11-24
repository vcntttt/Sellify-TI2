import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Boleta } from "./boleta";
import { useAuthStore } from "@/store/auth";
import { ToSellProduct } from "@/types/products";
import { format } from "date-fns";
import { MetodoPago, ToSaveVenta } from "@/types/ventas";
import { UserResponse } from "@/types/users";
import axios from "@/api/axios";
import { useVentaMutation } from "@/hooks/query/use-ventas";

interface Props {
  products: ToSellProduct[];
  total: number;
  onClose: () => void;
  payMethod: MetodoPago;
  clientRut: string;
}

const ProductSummary: React.FC<Props> = ({
  products,
  total,
  onClose,
  payMethod,
  clientRut,
}) => {
  const { user } = useAuthStore();
  const totalIVA = products.reduce((acc, product) => {
    const priceToUse = product.discountedPrice || product.unitPrice;
    const iva = priceToUse * 0.19;
    return acc + iva * product.quantity;
  }, 0);
  const registerVentaMutation = useVentaMutation();

  const handleFinalizePurchase = async () => {
    const iva = total * 0.19;
    Boleta({
      cajero: user.name,
      products,
      total,
      iva,
    });

    async function getClientID(rut: string) {
      const { data: info } = await axios.get<UserResponse>(`/users/${rut}`);
      return info.id_usuario;
    }
    // const tipoDocumento = {
    //   boleta: 1,
    //   factura: 2,
    // }
    const formaPago = {
      credito: 1,
      efectivo: 2,
      debito: 3,
      Puntos: 4,
    };

    const venta: ToSaveVenta = {
      id_cajero: user.id_usuario,
      total_sin_iva: total,
      total_con_iva: total + iva,
      fecha_venta: format(new Date(), "yyyy-MM-dd"),
      numero_documento: format(new Date(), "yyyyMMddHHmmss"),
      porcentaje: 0,
      id_forma_pago: formaPago[payMethod],
      id_tipodocumento: 1,
      productos: products.map((product) => ({
        id_producto: product.id,
        cantidad: product.quantity,
      })),
    };

    const clientID = await getClientID(clientRut);

    if (clientID) {
      venta.id_cliente = clientID;
    }

    console.log(venta);
    try {
      await registerVentaMutation.mutate(venta);
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  return (
    <div className="px-6 pt-6">
      <div className="max-h-96 overflow-y-auto">
        {products.map((product, index) => {
          const formattedOriginalPrice = formatPrice(product.originalPrice);
          const formattedTotalPrice = formatPrice(product.totalPrice);
          const formattedDiscountedPrice = formatPrice(
            product.discountedPrice || product.totalPrice
          );

          return (
            <div
              key={index}
              className={`flex justify-between items-center py-3 px-4 rounded-md transition-colors 
                          ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                          } hover:bg-gray-200`}
            >
              <div className="text-gray-700 font-medium">
                {String(product.id).padStart(3, "0")} - {product.name}{" "}
                <span className="text-gray-500">x{product.quantity}</span>
              </div>
              <div className="ml-8 text-right text-gray-700 font-semibold">
                {product.discountedPrice && product.discountValue > 0 ? (
                  <div className="flex items-end gap-x-2">
                    <span className="line-through text-gray-500">
                      {formattedOriginalPrice}
                    </span>
                    <span className="text-red-500">
                      {formattedDiscountedPrice}
                    </span>
                    <span className="text-gray-500">
                      (-{Math.round(product.discountValue)}%)
                    </span>
                  </div>
                ) : (
                  formattedTotalPrice
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-right font-bold text-lg mt-2 text-gray-800 border-t pt-2 border-gray-200">
        IVA: {formatPrice(totalIVA)}
      </div>
      <div className="text-right font-bold text-lg mt-4 text-gray-800 border-t pt-4 border-gray-200">
        Total: {formatPrice(total)}
      </div>

      <div className="w-full flex justify-end pt-4">
        <Button onClick={handleFinalizePurchase}>Finalizar compra</Button>
      </div>
    </div>
  );
};

export default ProductSummary;
