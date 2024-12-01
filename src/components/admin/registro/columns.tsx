import { Registro } from "@/types/registro";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Registro>[] = [
  {
  accessorKey: "mensaje",
  header: "Mensaje",
  },
  {
    accessorKey: "fecha_y_hora",
    header: "Fecha y Hora",
    cell: ({ getValue }) => format(new Date(getValue() as string), "HH:mm:ss dd/MM/yyyy"),
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ getValue }) => {
      const type = getValue() as string;
      return (
        <div className="flex justify-center items-center mx-auto">
          <span className="capitalize">{type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "usuario",
    header: "Usuario",
  },
];
