import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/users";
import { DataTableColumnHeader } from "@/components/tables/column-header";
import { Badge } from "@/components/ui/badge"; // Importa tu componente Badge

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

      const colorClasses = {
        cliente: "bg-teal-600 text-white",
        cajero: "bg-cyan-600 text-white",
        admin: "bg-slate-800 text-white",
      };

      if (!colorClasses[tipo]) return null;

      return (
        <div className="flex justify-center items-center h-full">
          <Badge className={`capitalize ${colorClasses[tipo]}`}>
            {tipo}
          </Badge>
        </div>
      );
    },
  },
];
