import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products } from "@/data/products";
import { useState } from "react";

export default function ProductSearch() {
  const [code, setCode] = useState("");

  const filteredProducts = products.filter(
    (product) => product.id == parseInt(code)
  );


  const finalProducts = filteredProducts.map((product) =>{
    const discount = product.discount?.value ?? 0;
    return {
      
        ...product,
        discountedPrice: product.price - (product.price * discount) / 100,
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
              const discount = product.discount?.value ?? 0;
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  {discount > 0 ? (
                    <TableCell>
                      <span className="line-through">{formattedPrice}</span>{" "}
                      <span className="text-red-500">{formattedDiscount}</span>
                    </TableCell>
                  ) : (
                    <TableCell>{formattedPrice}</TableCell>
                  )}
                  <TableCell>{discount ?? 0}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
