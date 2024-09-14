import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useAuthStore from "@/store/useAuthStore";
import AdminDialog from "@/components/auth/buttons/admin-dialog"; // Importa el AdminDialog

const roles = ["admin", "cashier", "customer"] as const;

const formSchema = z.object({
  name: z.string().min(0).max(50),
  role: z.enum(roles),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { setUser } = useAuthStore();
  const [isAdminDialogOpen, setAdminDialogOpen] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "customer",
    },
  });

  const handleAdminSelect = () => {
    setAdminDialogOpen(false);
    setLocation("/dashboard");
  };

  const handleCashierSelect = () => {
    setAdminDialogOpen(false);
    setLocation("/cashier");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setUser(values);

    if (values.role === "admin") {
      setAdminDialogOpen(true); // Muestra el diálogo si es admin
    } else if (values.role === "cashier") {
      setLocation("/cashier");
    } else {
      setIsUnauthorized(true);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isUnauthorized ? (
        <div className="flex items-center justify-center min-h-screen flex-col space-y-4">
          <div className="bg-red-500 text-white p-6 rounded-md shadow-md">
            <p>No autorizado. No tienes permiso para acceder a esta página.</p>
          </div>
          <Button onClick={() => setIsUnauthorized(false)}>
            Volver al login
          </Button>
        </div>
      ) : (
        <div className="bg-white p-6 shadow-md rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem value={role} key={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Entrar</Button>
            </form>
          </Form>
        </div>
      )}
      {/* Renderiza el diálogo si el rol es admin */}
      <AdminDialog
        isOpen={isAdminDialogOpen}
        onClose={() => setAdminDialogOpen(false)}
        onAdminSelect={handleAdminSelect}
        onCashierSelect={handleCashierSelect}
      />
    </div>
  );
}