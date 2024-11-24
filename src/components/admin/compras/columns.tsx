import { ColumnDef } from "@tanstack/react-table";
import { formatDate, formatPrice } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/tables/column-header";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "numero_documento",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Número de Documento" />
    ),
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);
      return String(cellValue).includes(String(filterValue));
    },
  },
  {
    accessorKey: "fecha_compra",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de Compra" />
    ),
    cell: ({ row }) => {
      return formatDate(new Date(row.getValue("fecha_compra") as string));
    },
  },
  {
    accessorKey: "proveedor",
    header: "Proveedor",
    cell: ({ row }) => {
      return <span>{row.getValue("proveedor")}</span>;
    },
  },
  {
    accessorKey: "total_sin_iva",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total sin IVA" />
    ),
    cell: ({ row }) => {
      const totalSinIVA = row.getValue("total_sin_iva") as number;
      return <div className="text-center">{formatPrice(totalSinIVA)}</div>;
    },
  },
  {
    accessorKey: "total_con_iva",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total con IVA" />
    ),
    cell: ({ row }) => {
      const totalConIVA = row.getValue("total_con_iva") as number;
      return <div className="text-center">{formatPrice(totalConIVA)}</div>;
    },
  },
  {
    accessorKey: "productos",
    header: "Productos Comprados",
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
            </li>
          ))}
        </ul>
      );
    },
  },
];
