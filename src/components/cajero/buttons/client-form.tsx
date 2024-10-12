import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/schemas/user"; 
import { useClients } from "@/hooks/query/use-clients";
import { registerUser } from "@/api/users"; 
import { useUserMutation } from "@/hooks/query/use-users";
import { NewUserBody } from "@/types/users";

export function RegisterNewClientForm() {
  const { data: clients } = useClients();
  const userMutation = useUserMutation();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      rut: "987654321",
      name: "junior",
      apellido: "Fernandez",
      email: "jn.fer@example.com",
      password: "pass123",
      role: "cliente",
      phone: "569131313",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const clientExists = clients?.some(client => client.rut === values.rut);

    if (clientExists) {
      alert("El cliente ya está registrado.");
      return;
    }

    const newUser: NewUserBody = {
      nombre: values.name,
      apellido: values.apellido,
      correo: values.email,
      rut: values.rut,
      telefono: values.phone,
      contrasena: values.password,
      tipo_usuario: values.role,
    };

    try {
      await registerUser(newUser);
      form.reset();
      alert("Cliente registrado correctamente!");
    } catch (error: any) {
      console.error("Error registering client:", error);
      alert(error?.response?.data?.message || "Ocurrió un error al registrar el cliente.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rut</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="12.345.678-9" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="+56 9 1234 5678" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="email@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="******"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={userMutation.isPending}>
            Registrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
