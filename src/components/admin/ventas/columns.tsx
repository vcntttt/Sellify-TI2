import { ColumnDef } from "@tanstack/react-table";
import { Venta } from "@/types/ventas";
import { CircleUserRound, FileDown } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SortedIcon } from "@/icons/sorted-icon";
import { addDays, isSameDay } from "date-fns";

export const columns: ColumnDef<Venta>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-slate-700 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Número de Boleta
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "fecha",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-slate-700 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return formatDate(row.getValue("fecha") as Date);
    },
    filterFn: (row, columnId, filterValue) => {
      const rowDate = new Date(row.getValue(columnId));
      return filterValue ? isSameDay(addDays(rowDate, 1), filterValue) : true;
    },
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    cell: ({row}) => {
      const nameClient = row.getValue("cliente") as string ?? "Cliente";
      return (
        <div className="flex items-center gap-2">
          <CircleUserRound className="h-5 w-5" />
          <span>{nameClient}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-slate-700 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const total = row.getValue("total") as number;
      return <div className="text-center">
        {formatPrice(total)}
      </div>;
    },
  },
  {
    accessorKey: "formaPago",
    header: "Forma de Pago",
    cell: ({row}) => {
      const value = row.getValue("formaPago") as string;
      return (
        <div className="capitalize">
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "tipoRegistro",
    header: "Boleta/Factura",
    cell: ({row}) => {
      const value = row.getValue("tipoRegistro") as string;
      return (
        <div className="capitalize">
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "detalleVentas",
    header: "Descargar",
    cell: () => {
      return (
        <Button variant="secondary">
          Descargar <FileDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];
