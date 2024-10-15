import { ColumnDef } from "@tanstack/react-table";
import { UserResponse } from "@/types/users";
import { DataTableColumnHeader } from "@/components/tables/column-header";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export const columns: ColumnDef<UserResponse>[] = [
  {
    accessorKey: "id_usuario",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID Usuario" />,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
  },
  {
    accessorKey: "apellido",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Apellido" />,
  },
  {
    accessorKey: "rut",
    header: ({ column }) => <DataTableColumnHeader column={column} title="RUT" />,
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Teléfono" />,
  },
  {
    accessorKey: "correo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Correo" />,
  },
  {
    accessorKey: "tipo_usuario",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo de Usuario" />,
    cell: ({ getValue }) => {
      const tipo = getValue<string>();

      return (
        <div className="flex justify-center items-center mx-auto">
          <Badge className={
            clsx("capitalize text-white w-2/4 flex justify-center", {
              "bg-teal-600": tipo === "cliente",
              "bg-blue-600": tipo === "cajero",
              "bg-slate-800": tipo === "admin",
              "bg-cyan-700": tipo === "proveedor",
            })
          }>
            {tipo}
          </Badge>
        </div>
      );
    },
  },
];
