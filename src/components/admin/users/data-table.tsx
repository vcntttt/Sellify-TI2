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
import { DataTableViewOptions } from '../../tables/column-visibility';
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddUserForm from "../add-user-form";

interface User {
  id: string;
  name: string;
  email: string;
  rut: string;
  role: "admin" | "cashier" | "customer";
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data: initialData,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<User[]>(initialData as unknown as User[]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isFormOpen, setIsFormOpen] = useState(false); 

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

  useEffect(() => {
    table.setPageSize(8);
  }, [table]);

  const handleAddUser = (user: User) => {
    setData((prevData) => [...prevData, user]);
  };

  return (
    <div>
      <div className="flex items-center pb-2 justify-between">
        <Input
          type="text"
          placeholder="Buscar usuario..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-md"
        />
        <div className="flex items-center justify-end gap-x-4 py-4 mx-2">

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsFormOpen(true)}>Agregar usuario</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                <DialogDescription>
                  Completa el formulario para agregar un nuevo usuario.
                </DialogDescription>
              </DialogHeader>
              <AddUserForm onAddUser={(data) => {
                const newUser: User = {
                  id: Date.now().toString(), 
                  ...data,
                };
                handleAddUser(newUser);
              }} onClose={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-slate-800 text-white">
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}