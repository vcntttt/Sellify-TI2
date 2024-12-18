import { ColumnDef } from "@tanstack/react-table";
import { ProductDiscount, Producto } from "@/types/products";
import { Button } from "@/components/ui/button";
import { EditProductForm } from "@/components/admin/products/edit-product";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import clsx from "clsx";
import { formatDate, formatPrice, formatDiscount } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/tables/column-header";
import { ResponsiveModal } from "@/components/responsive-modal";

export const columns: ColumnDef<Producto>[] = [
  {
    accessorKey: "codigoBarras",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Codigo Barras" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const discount = row.getValue("discount") as ProductDiscount;
      const { isValid, value } = formatDiscount(discount);
      const formattedPrice = formatPrice(price);
      const discountedPrice = isValid ? price - (price * value) / 100 : price;
      const formattedDiscountedPrice = formatPrice(discountedPrice);

      return (
        <div className="text-left font-medium">
          {isValid && value > 0 ? (
            <div className="flex items-center gap-2">
              <span className="line-through">{formattedPrice}</span>
              <span className="text-red-500">{formattedDiscountedPrice}</span>
            </div>
          ) : (
            <span>{formattedPrice}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descuento" />
    ),
    cell: ({ row }) => {
      const discount = row.getValue("discount") as ProductDiscount;
      const { isValid, value, dueDate } = formatDiscount(discount);
      const currentDate = new Date();
      let daysDiscount: string | null = null;

      if (dueDate) {
        const daysDiff = differenceInCalendarDays(dueDate, currentDate);
        if (daysDiff > 0) {
          daysDiscount = `Se acaba en ${daysDiff} día${
            daysDiff > 1 ? "s" : ""
          }!`;
        } else if (daysDiff === 0) {
          daysDiscount = "Se acaba hoy!";
        } else {
          daysDiscount = "";
        }
      }

      return (
        <div className="text-left font-medium flex flex-col gap-y-2">
          {isValid ? value : 0}%
          {daysDiscount && (
            <span className="text-red-500 text-xs">{daysDiscount}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoría" />
    ),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de vencimiento" />
    ),
    cell: ({ row }) => {
      const currentDate = new Date();
      const dueDate = row.getValue("dueDate") as Date;

      const formattedDate = formatDate(dueDate);
      const daysDiff = differenceInCalendarDays(dueDate, currentDate);

      if (daysDiff > 0) {
        return (
          <div className="text-left font-medium flex flex-col gap-y-2">
            {formattedDate}
            <span
              className={clsx(
                "text-xs",
                daysDiff < 7 ? "text-red-500" : "text-black/30"
              )}
            >
              Se vence en {daysDiff} día{daysDiff > 1 ? "s" : ""}!
            </span>
          </div>
        );
      } else if (daysDiff === 0) {
        return (
          <div className="text-left font-medium flex flex-col gap-y-2">
            {formattedDate}
            <span className="text-red-500 text-xs">Se vence hoy!</span>
          </div>
        );
      } else {
        return (
          <div className="text-left font-medium flex flex-col gap-y-2">
            {formattedDate}
            <span className="text-red-500 text-xs">Producto vencido</span>
          </div>
        );
      }
    },
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de creación" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      const formattedDate = formatDate(createdAt);

      return <div className="text-left font-medium">{formattedDate}</div>;
    },
    enableHiding: true,
  },
  {
    accessorKey: "action",
    header: "Editar",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      return (
        <ResponsiveModal
          trigger={<Button variant="secondary">Editar Producto</Button>}
          title="Editar Producto"
          description="Edita la información de tu producto"
          className="sm:max-w-[625px] sm:min-h-[400px]"
          state={isOpen}
          setState={setIsOpen}
        >
          <EditProductForm
            product={row.original}
            onClose={() => setIsOpen(false)}
          />
        </ResponsiveModal>
      );
    },
  },
];
