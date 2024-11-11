import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Role } from "@/types/users";

type Status = 'Success' | 'Error';

export default function RegisterActions({ tableRef }: { tableRef: any }) {
  const [action, setAction] = useState<Role | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    if (action === null) {
      tableRef.getColumn("tipo_action")?.setFilterValue(undefined);
    } else {
      tableRef.getColumn("tipo_action")?.setFilterValue(action);
    }
  }, [action, tableRef]);

  useEffect(() => {
    if (status === null) {
      tableRef.getColumn("type")?.setFilterValue(undefined);
    } else {
      tableRef.getColumn("type")?.setFilterValue(status);
    }
  }, [status, tableRef]);

  return (
    <div className="flex gap-4">
    <DropdownMenu>
	    <DropdownMenuTrigger asChild>
          <Button variant="outline">Filtros</Button>
        </DropdownMenuTrigger>
	  <DropdownMenuContent className="w-56">
	    <DropdownMenuItem>
	        <Select onValueChange={(value) => setAction(value === "todos" ? null : (value as Role))}>
             <SelectTrigger className="w-[180px]">
               <SelectValue placeholder="Filtrar usuarios" />
             </SelectTrigger>
             <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="cajero">Cajero</SelectItem>
              <SelectItem value="cliente">Cliente</SelectItem>
              <SelectItem value="proveedor">Proveedor</SelectItem>
             </SelectContent>
            </Select>
          </DropdownMenuItem>
	      <DropdownMenuItem>
	        <Select onValueChange={(value) => setStatus(value === "todos" ? null : (value as Status))}>
             <SelectTrigger className="w-[180px]">
               <SelectValue placeholder="Filtrar status" />
             </SelectTrigger>
             <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Success">Success</SelectItem>
              <SelectItem value="Error">Error</SelectItem>
             </SelectContent>
            </Select>
          </DropdownMenuItem>
	    </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}