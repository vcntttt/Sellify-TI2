import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductStore } from "@/store/products";
import { useState } from "react";

export default function ProductSearch() {
  const { products } = useProductStore();
  const [code, setCode] = useState("");

  const filteredProducts = products.filter(
    (product) => product.id == parseInt(code)
  );


  const finalProducts = filteredProducts.map((product) =>{
    const discountValue = product.discount?.value ?? 0;
    const discountDueDate = product.discount?.dueDate ?? undefined;
    const currentDate = new Date();
    const isDiscountValid = discountDueDate ? currentDate < discountDueDate : true;
    const priceFinal = isDiscountValid ? (product.price - (product.price * discountValue) / 100) : product.price;
    return {
      
        ...product,
        isDiscountValid,
        discountedPrice: priceFinal,
        discountValue: isDiscountValid ? discountValue : 0,
      }
    }
  );

  return (
    <div className="py-4">
      <Input
        type="number"
        placeholder="001"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {filteredProducts.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Producto</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Descuento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {finalProducts.map((product, index) => {
              const formattedPrice = new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(product.price);

              const formattedDiscount = new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(product.discountedPrice);
              const discountValue = product.discountValue;
              const isDiscountValid = product.isDiscountValid;
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  {isDiscountValid ? (
                    <TableCell>
                      <span className="line-through">{formattedPrice}</span>{" "}
                      <span className="text-red-500">{formattedDiscount}</span>
                    </TableCell>
                  ) : (
                    <TableCell>{formattedPrice}</TableCell>
                  )}
                  <TableCell>{discountValue ?? 0}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
