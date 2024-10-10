import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import AddUserForm from "../add-user-form";

export default function UsersActions() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="flex gap-4">
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
