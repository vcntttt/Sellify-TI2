import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Validación de RUT simple: debe tener entre 7 y 10 caracteres
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Ingresa un correo válido."),
  rut: z.string().regex(/^[0-9]+-[0-9kK]$/, "Ingresa un RUT válido."), // Validación básica para el formato RUT
  role: z.enum(["admin", "cashier", "customer"]),
});

type FormData = z.infer<typeof formSchema>;

export default function AddUserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data); // Aquí puedes hacer lo que necesites con los datos
    alert("Usuario agregado con éxito");
  };

  return (
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
        <select id="role" {...register("role")} className="w-full p-2 border">
          <option value="admin">Admin</option>
          <option value="cashier">Cajero</option>
          <option value="customer">Cliente</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role?.message}</p>}
      </div>

      <Button type="submit">Agregar Usuario</Button>
    </form>
  );
}
