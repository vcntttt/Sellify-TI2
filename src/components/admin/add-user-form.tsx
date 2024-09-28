import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

//validacion de rut 9 o mas caracteres
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Ingresa un correo válido."),
  rut: z.string().regex(/^[0-9]+-[0-9kK]$/, "Ingresa un RUT válido."),
  role: z.enum(["admin", "cashier", "customer"]),
});

type FormData = z.infer<typeof formSchema>;

export default function AddUserForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [open, setOpen] = useState(false); 

  const onSubmit = (data: FormData) => {
    setOpen(true); // mostrar pop-up
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Correo</Label>
          <Input id="email" {...register("email")} />
          {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
        </div>

        <div>
          <Label htmlFor="rut">RUT</Label>
          <Input id="rut" {...register("rut")} />
          {errors.rut && <p className="text-red-500">{errors.rut?.message}</p>}
        </div>

        <div>
          <Label htmlFor="role">Rol</Label>
          <Select
            onValueChange={(value) => setValue("role", value as FormData["role"])} // Actualiza el valor seleccionado
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="cashier">Cajero</SelectItem>
              <SelectItem value="customer">Cliente</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-red-500">{errors.role?.message}</p>}
        </div>

        <div className="flex gap-x-2 *:w-1/2 pt-4 justify-end">
          <Button type="submit">Agregar Usuario</Button>
        </div>
      </form>

      {/* Popup de confirmación */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Usuario agregado</DialogTitle>
            <DialogDescription>
              El usuario ha sido agregado con éxito.
            </DialogDescription>
            <Button onClick={() => setOpen(false)}>Cerrar</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
