import { ColumnDef } from "@tanstack/react-table";
import { FileDown } from "lucide-react";
import { formatDate, formatDatesFromResponse, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { DataTableColumnHeader } from "@/components/tables/column-header";
import { PDF } from "./pdf";
import { Venta } from "@/types/ventas";

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
      return formatDate(new Date(row.getValue("fecha_venta") as string));
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || !filterValue.from || !filterValue.to) {
        return true;
      }
      const start = startOfDay(filterValue.from);
      const end = endOfDay(filterValue.to);
      const rowDate = new Date(row.getValue(columnId));
      return isWithinInterval(rowDate, {
        start: start,
        end: end,
      });
    },
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "total_con_iva",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const total = row.original.total_con_iva;
      return (
        <div className="text-center">
        {formatPrice(total)}
      </div>
      )
    },
  },
  {
    accessorKey: "forma_pago",
    header: "Forma de Pago",
  },
  {
    accessorKey: "tipo_documento",
    header: "Boleta/Factura",
    cell: ({ row }) => <span className="capitalize">{row.original.tipo_documento}</span>,
  },
  {
    accessorKey: "productos",
    header: "Productos Vendidos",
    cell: ({ row }) => {
      const productos = row.getValue("productos") as {
        nombre: string;
        cantidad: number;
        descripcion: string;
      }[];

      if (!productos || productos.length === 0) {
        return <span>No hay productos</span>;
      }

      return (
        <ul>
          {productos.map((producto, index) => (
            <li key={index}>
              <strong>{producto.nombre}</strong> - {producto.cantidad} unidades
              <br />
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "detalleVentas",
    header: "Descargar",
    cell: ({ row }) => {
      const venta = {
        numero_documento: row.original.numero_documento,
        fecha: formatDatesFromResponse(row.original.fecha_venta),
        cliente: row.original.cliente,
        formaPago: row.original.forma_pago,
        tipoRegistro: row.original.tipo_documento,
        total: row.original.total_con_iva,
        productos: row.getValue("productos") as {
          nombre: string;
          cantidad: number;
          descripcion?: string;
        }[],
      };

      return (
        <Button variant="secondary" onClick={() => PDF(venta)}>
          Descargar <FileDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  }
];
