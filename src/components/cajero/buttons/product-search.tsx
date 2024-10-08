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
import { formatDiscount } from "@/lib/utils"; // Adjust the import path as necessary

export default function ProductSearch() {
  const { products } = useProductStore();
  const [code, setCode] = useState("");

  const filteredProducts = products.filter(
    (product) => product.id === parseInt(code)
  );

  const finalProducts = filteredProducts.map((product) => {
    const { isValid, value: discountValue } = formatDiscount(product.discount);
    const priceFinal = isValid
      ? product.price - (product.price * discountValue) / 100
      : product.price;

    return {
      ...product,
      isDiscountValid: isValid,
      discountedPrice: priceFinal,
      discountValue: isValid ? discountValue : 0,
    };
  });

  return (
    <div className="py-4">
      <Input
        type="number"
        placeholder="Código del producto"
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

              const formattedDiscountedPrice = new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(product.discountedPrice);

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  {product.isDiscountValid ? (
                    <TableCell>
                      <span className="line-through">{formattedPrice}</span>{" "}
                      <span className="text-red-500">{formattedDiscountedPrice}</span>
                    </TableCell>
                  ) : (
                    <TableCell>{formattedPrice}</TableCell>
                  )}
                  <TableCell>{product.discountValue}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
