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
      const fromDate = format(startOfDay(filterValue.from), "yyyy-MM-dd");
      const toDate = format(startOfDay(filterValue.to), "yyyy-MM-dd");

      if (filterValue && filterValue.from && filterValue.to && isSameDay(filterValue.from, filterValue.to)) {
        return isSameDay(rowDate, fromDate || toDate);
      }

      if (filterValue && filterValue.from && filterValue.to) {
        return isWithinInterval(rowDate, { start: fromDate, end: toDate });
      }
      return true;
    },
  },
  {
    accessorKey: "id_cliente",
    header: "Cliente",
    cell: ({ row }) => {
      const clientId = row.getValue("id_cliente") as number;
      return (
        <div className="flex items-center gap-2">
          <CircleUserRound className="h-5 w-5" />
          <span>{clientId}</span>
        </div>
      );
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
    accessorKey: "id_forma_pago",
    header: "Forma de Pago",
    cell: ({ row }) => {
      const paymentMethodId = row.getValue("id_forma_pago") as number;
      const paymentMethod =
        paymentMethodId === 1
          ? "Crédito"
          : paymentMethodId === 2
          ? "Efectivo"
          : paymentMethodId === 3
          ? "Débito"
          : "Desconocido";
      return <div className="capitalize">{paymentMethod}</div>;
    },
  },
  {
    accessorKey: "id_tipodocumento",
    header: "Boleta/Factura",
    cell: ({ row }) => {
      const documentTypeId = row.getValue("id_tipodocumento") as number;
      const documentType =
        documentTypeId === 1 ? "Boleta" : documentTypeId === 2 ? "Factura" : "Desconocido";
      return <div className="capitalize">{documentType}</div>;
    },
  },
  {
    accessorKey: "detalleVentas",
    header: "Descargar",
    cell: ({ row }) => {
      const venta = {
        numero_documento: row.getValue("numero_documento"),
        fecha: new Date(row.getValue("fecha_venta") as string),  
        cliente: row.getValue("id_cliente"),  
        formaPago: row.getValue("id_forma_pago") === 1 ? "Crédito" : row.getValue("id_forma_pago") === 2 ? "Efectivo" : "Débito",
        tipoRegistro: row.getValue("id_tipodocumento") === 1 ? "Boleta" : "Factura",
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
