import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { SortedIcon } from "@/components/icons/sorted-icon";
import { User } from "@/types/users";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id_usuario",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-slate-700 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID Usuario
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-slate-700 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "apellido",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-slate-700 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellido
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "rut",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-slate-700 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RUT
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-slate-700 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Telefono
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "correo",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-slate-700 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correo
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
];
