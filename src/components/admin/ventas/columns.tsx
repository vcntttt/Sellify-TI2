import { ColumnDef } from "@tanstack/react-table"; 
import { Venta } from "@/types/ventas";
import { CircleUserRound, FileDown } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format, isSameDay, isWithinInterval, startOfDay } from "date-fns";
import { DataTableColumnHeader } from "@/components/tables/column-header";
import { PDF } from "./pdf";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "numero_documento",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Número de Boleta" />
    ),
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);
      return String(cellValue).includes(String(filterValue));
    },
  },
  {
    accessorKey: "fecha_venta",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      return formatDate(row.getValue("fecha_venta") as string);
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || !filterValue.from || !filterValue.to) {
        return true;
      }

      const rowDate = new Date(row.getValue(columnId));
      return isWithinInterval(rowDate, {
        start: filterValue.from,
        end: filterValue.to,
      });
    },
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    cell: ({ row }) => {
      return <span>{row.getValue("cliente")}</span>;
    },
  },
  {
    accessorKey: "total_con_iva",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const total = row.getValue("total_con_iva") as number;
      return <div className="text-center">{formatPrice(total)}</div>;
    },
  },
  {
    accessorKey: "forma_pago",
    header: "Forma de Pago",
    cell: ({ row }) => {
      return <span>{row.getValue("forma_pago")}</span>;
    },
  },
  {
    accessorKey: "tipo_documento",
    header: "Boleta/Factura",
    cell: ({ row }) => {
      return <span>{row.getValue("tipo_documento")}</span>;
    },
  },
  {
    accessorKey: "detalleVentas",
    header: "Descargar",
    cell: ({ row }) => {
      const venta = {
        numero_documento: row.getValue("numero_documento"),
        fecha: new Date(row.getValue("fecha_venta") as string),
        cliente: row.getValue("cliente"),
        formaPago: row.getValue("forma_pago"),
        tipoRegistro: row.getValue("tipo_documento"),
        total: row.getValue("total_con_iva"),
      };

      return (
        <Button variant="secondary" onClick={() => PDF(venta)}>
          Descargar <FileDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];
