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
import { DrawerContent, DrawerClose, DrawerHeader, DrawerFooter, DrawerTitle } from "@/components/ui/drawer";

export function RegisterNewClientForm({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const addClient = (data: any) => {
    console.log("addClient", data);
  };
  const { data: clients } = useClients();

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
    const clientExists = clients?.some((client) => client.rut === values.rut);

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
    onClose();
  }

  return (
    <>
      {isOpen && (
        <DrawerContent className="sm:w-[95%] md:w-[70%] lg:w-[50%] max-w-md mx-auto">
          <DrawerHeader className="text-center">
            <DrawerTitle>Registrar Nuevo Cliente</DrawerTitle>
          </DrawerHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
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
                      <Input {...field} className="w-full" />
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
                      <Input {...field} className="w-full" placeholder="12.345.678-9" />
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
                        className="w-full"
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
                      <Input {...field} type="password" className="w-full" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter className="flex justify-end gap-x-2 pt-4">
                <DrawerClose asChild>
                  <Button type="submit">Registrar</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      )}
    </>
  );
}