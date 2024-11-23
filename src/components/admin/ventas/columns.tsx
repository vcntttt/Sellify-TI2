import { ColumnDef } from "@tanstack/react-table"; 
import {  FileDown } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { isWithinInterval } from "date-fns";
import { DataTableColumnHeader } from "@/components/tables/column-header";
import { PDF } from "./pdf";
import { TipoRegistro, MetodoPago } from "@/types/ventas";
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
      return formatDate(new Date(row.getValue("fecha_venta") as string));
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
      return <span className="capitalize">{row.getValue("forma_pago")}</span>;
    },
  },
  {
    accessorKey: "tipo_documento",
    header: "Boleta/Factura",
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("tipo_documento")}</span>;
    },
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
  }
  
,  
{
  accessorKey: "detalleVentas",
  header: "Descargar",
  cell: ({ row }) => {
    const venta = {
      numero_documento: row.getValue("numero_documento") as string,
      fecha: new Date(row.getValue("fecha_venta") as string),
      cliente: row.getValue("cliente") as string,
      formaPago: row.getValue("forma_pago") as MetodoPago,
      tipoRegistro: row.getValue("tipo_documento") as TipoRegistro,
      total: row.getValue("total_con_iva") as number,
      productos: row.getValue("productos") as {
        nombre: string;
        cantidad: number;
        descripcion?: string;
      }[], // Agregamos los productos vendidos
    };

    return (
      <Button variant="secondary" onClick={() => PDF(venta)}>
        Descargar <FileDown className="w-4 h-4 ml-2" />
      </Button>
    );
  },
}
];
