import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import RegisterActions from "./actions";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/tables/column-options";
import { format } from "date-fns";
import { ShowNotification } from "@/components/NotificationProvider";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  refetchFn: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  isLoading,
  data,
  refetchFn,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "fecha_y_hora",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const handleRefetch = async () => {
    try {
      refetchFn();
      const loadTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
      ShowNotification("Registros cargados con éxito.", "success", loadTime);
    } catch (error) {
      console.error("Error al actualizar los productos:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center pb-2 justify-between">
        <Input
          type="text"
          placeholder="Buscar usuario..."
          value={(table.getColumn("usuario")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("usuario")?.setFilterValue(event.target.value)
          }
          className="max-w-md"
        />
        <div className="flex items-center justify-end gap-x-4 py-4 mx-2 border-b">
          <RegisterActions tableRef={table} />
          <DataTableViewOptions table={table} refetchFn={handleRefetch} />
        </div>
      </div>

      <Table className="border border-gray-300">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b border-gray-300">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="bg-primary text-white p-2 text-center"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell
                  colSpan={columns.length}
                  className="text-center border-b border-gray-300"
                >
                  <Skeleton className="rounded-md h-6 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 border-b border-gray-300"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-gray-500 border-b border-gray-300"
              >
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
