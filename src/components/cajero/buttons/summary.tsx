import { Button } from "@/components/ui/button";
import { formatPrice, formatDiscount } from "@/lib/utils"; 
import { ProductDiscount } from "@/types/products";
import { Boleta } from "./boleta";
import { useAuthStore } from "@/store/auth";

interface Product {
  id: number;
  name: string;
  quantity: number;
  totalPrice: number; 
  originalPrice: number;
  discountedPrice?: number;
  discount?: ProductDiscount; 
}

interface Props {
  products: Product[];
  total: number; 
  onClose: () => void;
}

const ProductSummary: React.FC<Props> = ({ products, total, onClose }) => {
  const { user } = useAuthStore();
  const totalIVA = products.reduce((acc, product) => {
    const priceToUse = product.discountedPrice || product.originalPrice;
    const iva = priceToUse * 0.19; 
    return acc + (iva * product.quantity); 
  }, 0);

  const handleFinalizePurchase = () => {
    const iva = total * 0.19;
    Boleta({
      cajero: user.name, 
      products,          
      total,             
      iva                
    });
    onClose();
  };

  return (
    <div className="px-6 pt-6">
      <div className="max-h-96 overflow-y-auto">
        {products.map((product, index) => {
          const formattedOriginalPrice = formatPrice(product.originalPrice);
          const formattedTotalPrice = formatPrice(product.totalPrice);
          const formattedDiscountedPrice = formatPrice(product.discountedPrice || product.totalPrice);
          const discountDetails = product.discount ? formatDiscount(product.discount) : { isValid: false, value: 0 };

          const discount = discountDetails.isValid 
            ? ((product.originalPrice - (product.discountedPrice || product.originalPrice)) / product.originalPrice) * 100 
            : 0;

          return (
            <div
              key={index}
              className={`flex justify-between items-center py-3 px-4 rounded-md transition-colors 
                          ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} hover:bg-gray-200`}
            >
              <div className="text-gray-700 font-medium">
                {String(product.id).padStart(3, "0")} - {product.name}{" "}
                <span className="text-gray-500">x{product.quantity}</span>
              </div>
              <div className="ml-8 text-right text-gray-700 font-semibold">
                {product.discountedPrice && discount > 0 ? (
                  <div className="flex items-end gap-x-2">
                    <span className="line-through text-gray-500">{formattedOriginalPrice}</span>
                    <span className="text-red-500">{formattedDiscountedPrice}</span>
                    <span className="text-gray-500">(-{Math.round(discount)}%)</span>
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
