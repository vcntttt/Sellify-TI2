import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react";
import AddUserForm from "../add-user-form";
import { Role } from "@/types/users";

export default function UsersActions({ tableRef }: { tableRef: any }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [usuario, setUsuario] = useState<Role | null>(null);

  useEffect(() => {
    if (usuario === null) {
      tableRef.getColumn("tipo_usuario")?.setFilterValue(undefined);
    } else {
      tableRef.getColumn("tipo_usuario")?.setFilterValue(usuario);
    }
  }, [usuario, tableRef]);

  return (
    <div className="flex gap-4">
      <Select onValueChange={(value) => setUsuario(value === "todos" ? null : (value as Role))}>
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
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsFormOpen(true)} variant={"outline"}>
            Agregar usuario
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
            <DialogDescription>
              Completa el formulario para agregar un nuevo usuario.
            </DialogDescription>
          </DialogHeader>
          <AddUserForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
