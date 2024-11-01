import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { formatDiscount, priceToInt } from "@/lib/utils";
import { useProducts } from "@/hooks/query/use-products";
import { Producto } from "@/types/products";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface ProductSearchProps {
  onAddProduct: (product: Producto) => void;
}

export default function ProductSearch({ onAddProduct }: ProductSearchProps) {
  const { data: products, isFetching } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = searchTerm
    ? products?.filter(
        (product) =>
          product.codigoBarras?.includes(searchTerm) ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const finalProducts = filteredProducts?.map((productItem: Producto) => {
    const { isValid, value: discountValue } = formatDiscount(
      productItem.discount
    );
    const product = {
      ...productItem,
      price: priceToInt(productItem.price),
    };

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
      {isFetching ? (
        <div className="flex items-center justify-center">
          <Skeleton className="h-6 w-full" />
        </div>
      ) : (
        <Input
          className="mb-4"
          type="text" 
          placeholder="Nombre o Código del producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      {(filteredProducts?.length ?? 0) > 0 && (
        <div className="max-h-[390px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Descuento</TableHead>
                <TableHead>Acción</TableHead> 
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalProducts?.map((product, index) => {
                const formattedPrice = new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(product.price);

                const formattedDiscountedPrice = new Intl.NumberFormat(
                  "es-CL",
                  {
                    style: "currency",
                    currency: "CLP",
                  }
                ).format(product.discountedPrice);

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
                    <TableCell>
                      <Button
                        className="bg-blue-500 text-white"
                        onClick={() => onAddProduct(product)} 
                      >
                        Agregar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
