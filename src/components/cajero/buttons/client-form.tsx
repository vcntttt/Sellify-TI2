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

export function RegisterNewClientForm() {
  const addClient = (data: any) => {
    console.log("addClient", data);
  }
  const { data : clients } = useClients();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      rut: "",
      name: "",
      apellido: "",
      email: "",
      password: "",
      role: "cliente", 
    },
  });

  function onSubmit(values: z.infer<typeof userSchema>) {
    const clientExists = clients?.some(client => client.rut === values.rut);

    if (clientExists) {
      alert("El cliente ya está registrado.");
      return;
    }

    const clientData = {
      ...values,
      role: "customer", 
    };

    addClient(clientData); 

    form.reset(); 
    alert("Cliente registrado correctamente!");
  }

  return (
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
        <div className="flex justify-end gap-x-2 pt-4">
          <Button type="submit">Registrar</Button>
        </div>
      </form>
    </Form>
  );
}
