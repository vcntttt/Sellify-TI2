import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/users";
import { DataTableColumnHeader } from "@/components/tables/column-header";

export const columns: ColumnDef<User>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Telefono" />,
  },
  {
    accessorKey: "correo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Correo" />,
  },
];
