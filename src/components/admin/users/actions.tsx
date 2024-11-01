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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import AddUserForm from "../add-user-form";
import { Role } from "@/types/users";
import { roles } from "@/data/roles";

export default function UsersActions({ tableRef }: { tableRef: any }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (selectedRoles.length > 0) {
      tableRef?.getColumn("tipo_usuario")?.setFilterValue(selectedRoles);
    } else {
      tableRef?.getColumn("tipo_usuario")?.setFilterValue(undefined);
    }
  }, [selectedRoles, tableRef]);

  const handleRoleToggle = (role: Role) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role) 
        : [...prevRoles, role]
    );
  };

  return (
    <div className="flex gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto hidden h-10 lg:flex">
            Filtrar Usuarios
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Seleccionar roles</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {roles.map((role) => (
            <DropdownMenuCheckboxItem
              key={role}
              checked={selectedRoles.includes(role)}
              onCheckedChange={() => handleRoleToggle(role)}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Agregar usuario</Button>
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
