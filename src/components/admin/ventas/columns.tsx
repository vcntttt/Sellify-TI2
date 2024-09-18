"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Venta = {
  numeroBoleta: number;
  monto: number;
  fecha: Date;
  boleta: string;
};

export const columns: ColumnDef<Venta>[] = [
  {
    accessorKey: "numeroBoleta",
    header: "Número de Boleta",
  },
  {
    accessorKey: "boleta",
    header: "Boleta",
  },
  {
    accessorKey: "monto",
    header: "Monto",
    cell: ({ getValue }) => `$${getValue()}`, 
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ cell }) => {
        const fecha = new Date(cell.getValue() as string); 
        return fecha.toLocaleDateString(); 
    },
  },
];
