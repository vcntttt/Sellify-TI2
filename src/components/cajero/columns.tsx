import { formatPrice } from "@/lib/utils";
import { ToSellProduct } from "@/types/products";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ToSellProduct>[] = [
  {
    accessorKey: "codigoBarras",
    header: "Codigo de Barras",
    cell: ({ row }) => {
      const barCode = row.getValue("codigoBarras") as string;

      return <div className="font-medium text-center">{barCode}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const barCode = row.getValue("name") as string;

      return <div className="font-medium text-center">{barCode}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
    cell: ({ row }) => {
      const barCode = row.getValue("quantity") as string;

      return <div className="font-medium text-center">{barCode}</div>;
    },
  },
  {
    accessorKey: "unitPrice",
    header: "Precio Unitario",
    cell: ({ row }) => {
      const originalPrice = formatPrice(
        row.getValue("originalPrice") as number
      );
      const unitPrice = formatPrice(row.getValue("unitPrice") as number);
      const discountValue = row.getValue("discountValue") as number;

      return (
        <div className="text-center font-medium">
          {discountValue > 0 ? (
            <div className="flex justify-center gap-2">
              <span className="line-through">{originalPrice}</span>
              <span className="text-red-500">{unitPrice}</span>
            </div>
          ) : (
            <span className="text-center">{originalPrice}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Precio Total",
    cell: ({ row }) => {
      const price = row.getValue("totalPrice") as number;
      const formattedPrice = formatPrice(price);

      return <div className="font-medium text-center">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "discountValue",
    header: "Descuento",
    cell: ({ row }) => {
        const discountValue = row.getValue("discountValue") as number;

      return <div className="font-medium text-center">{discountValue}</div>;
    },
  },
  {
    accessorKey: "originalPrice",
    header: "Descuento",
    cell: ({ row }) => {
        const discountValue = row.getValue("discountValue") as number;

      return <div className="font-medium text-center">{discountValue}</div>;
    },
  },
];
