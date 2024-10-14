import { ColumnDef } from "@tanstack/react-table";
import { Venta } from "@/types/ventas";
import { CircleUserRound, FileDown } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format, isSameDay, isWithinInterval, startOfDay } from "date-fns";
import { DataTableColumnHeader } from "@/components/tables/column-header";
import { PDF } from "./pdf";

export const columns: ColumnDef<Venta>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Número de Boleta" />,
  },
  {
    accessorKey: "fecha",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha" />,
    cell: ({ row }) => {
      return formatDate(row.getValue("fecha") as Date);
    },

    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || !filterValue.from || !filterValue.to) {
        return true;
      }

      const rowDate = new Date(row.getValue(columnId))
      
      // estadarizacion de fechas provenientes del filtro
      const fromDate = format(startOfDay(filterValue?.from), "yyyy-MM-dd");
      const toDate = format(startOfDay(filterValue?.to), "yyyy-MM-dd");
    
      // Si 'from' y 'to' son el mismo día
      if (filterValue && filterValue.from && filterValue.to && isSameDay(filterValue.from, filterValue.to)) {
        return isSameDay(rowDate, fromDate || toDate);
      }
    
      // Si se selecciona un rango de fechas, verificamos que esté dentro del rango
      if (filterValue && filterValue.from && filterValue.to) {
        return isWithinInterval(rowDate, { start: fromDate, end: toDate });
      }
      return true ;
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
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
    cell: ({row}) => {
      const venta = row.original;
      return (
        <Button variant="secondary" onClick={() => PDF(venta)}>
          Descargar <FileDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];