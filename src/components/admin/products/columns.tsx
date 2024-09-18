import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { Category, ProductDiscount, Producto } from "@/types/products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowDown, ArrowUp } from "lucide-react";
import { EditProductForm } from "@/components/admin/products/edit-product";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import clsx from "clsx";

// eslint-disable-next-line react-refresh/only-export-components
const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
  if (isSorted === "asc") {
    return <ArrowUp className="h-4 w-4" />;
  }
  if (isSorted === "desc") {
    return <ArrowDown className="h-4 w-4" />;
  }

  return null;
};

export const columns: ColumnDef<Producto>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const discount = row.getValue("discount") as ProductDiscount;
      const discountedPrice = price - (price * discount.value) / 100;

      const formattedPrice = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(price);

      const formattedDiscount = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(discountedPrice);

      return (
        <div className="text-left font-medium">
          {discount.value > 0 ? (
            <div className="flex items-center gap-2">
              <span className="line-through">{formattedPrice}</span>
              <span className="text-red-500">{formattedDiscount}</span>
            </div>
          ) : (
            <span>{formattedPrice}</span>
          )}
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "discount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descuento
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const discount = row.getValue("discount") as ProductDiscount;
      const dueDate = discount.dueDate;
      let daysDiscount: string | null = null;

      if (dueDate) {
        const currentDate = new Date();
        const daysDiff = differenceInCalendarDays(dueDate, currentDate);

        if (daysDiff > 0) {
          daysDiscount = `Se acaba en ${daysDiff} día${
            daysDiff > 1 ? "s" : ""
          }!`;
        } else if (daysDiff === 0) {
          daysDiscount = "Se acaba hoy!";
        } else {
          daysDiscount = "El descuento ha expirado";
        }
      }

      return (
        <div className="text-left font-medium flex flex-col gap-y-2">
          {discount.value}%
          {daysDiscount && (
            <span className="text-red-500 text-xs">{daysDiscount}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoría
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de vencimiento
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const currentDate = new Date();
      const dueDate = row.getValue("dueDate") as Date;

      const formattedDate = format(dueDate, "dd-MM-yyyy", { locale: es });
      const daysDiff = differenceInCalendarDays(dueDate, currentDate);

      if (daysDiff > 0) {
        return (
          <div className="text-left font-medium flex flex-col gap-y-2">
            {formattedDate}
            <span className={clsx("text-xs", daysDiff < 7 ? "text-red-500" : "text-black/30")}>
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de creación
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      const formattedDate = new Intl.DateTimeFormat("es-CL").format(createdAt);

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
      const id = row.getValue("id") as number;
      const name = row.getValue("name") as string;
      const stock = row.getValue("stock") as number;
      const price = row.getValue("price") as number;
      const category = row.getValue("category") as Category;
      const discount = row.getValue("discount") as ProductDiscount;
      const dueDate = row.getValue("dueDate") as Date;
      const createdAt = row.getValue("createdAt") as Date;
      const product = {
        id,
        name,
        stock,
        price,
        category,
        discount,
        dueDate,
        createdAt,
      };
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="">
              Editar Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar</DialogTitle>
              <DialogDescription>
                Edita la información de tu producto.
              </DialogDescription>
            </DialogHeader>
            <EditProductForm
              product={product}
              onClose={() => setIsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      );
    },
    enableHiding: false,
  },
];
