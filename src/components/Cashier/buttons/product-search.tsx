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

  const filteredProducts = products.filter((product) =>
    product.id == parseInt(code)
  );

  return (
    <div>
      <Input type="text" placeholder="001" value={code} onChange={(e) => setCode(e.target.value)} />
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
          {filteredProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.stock}</TableCell>
              {/* // TODO: Poner el descuento en el precio */}
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.discount ?? 0}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
