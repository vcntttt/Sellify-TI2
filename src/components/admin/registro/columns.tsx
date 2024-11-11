import { ColumnDef } from "@tanstack/react-table";

type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  description?: string;
  timestamp: string;
  user: string;
};

// Definición de las columnas para la tabla de notificaciones
export const columns: ColumnDef<Notification>[] = [
  {
  accessorKey: "message",
  header: "Mensaje",
  },
  {
    accessorKey: "timestamp",
    header: "Fecha y Hora",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(), // Formato de fecha
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ getValue }) => {
      const type = getValue() as string;
      return (
        <div className="flex justify-center items-center mx-auto">
          {/* Mostramos solo el texto sin el Badge */}
          <span className="capitalize">{type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ getValue }) => getValue() || "-", // Si no tiene descripción, mostrar '-'
  },
  {
    accessorKey: "user",
    header: "Usuario",
  },
];
