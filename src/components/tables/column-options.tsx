import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronLeft, ChevronRight, Settings2Icon } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { RefreshCcw } from "lucide-react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  refetchFn?: () => void;
}

export function DataTableViewOptions<TData>({
  table,
  refetchFn,
}: DataTableViewOptionsProps<TData>) {
  
  return (
    <div className="flex items-center justify-end gap-x-4">
      <Button size={"icon"} variant={"outline"} onClick={refetchFn ?? (() => {alert("refetchFn no definida")})}>
        <RefreshCcw size={20}/>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-10 lg:flex"
          >
            <Settings2Icon className="mr-2 h-4 w-4" />
            Columnas
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Alternar columnas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="space-x-2 flex">
      <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <Select onValueChange={(value) => table.setPageSize(parseInt(value))}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filas por página</SelectLabel>
          <SelectItem value="6">6</SelectItem>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="14">14</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="18">18</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </TooltipTrigger>
    <TooltipContent>
      <p>Cambia el número de filas por página</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}