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
import { useAuthStore } from "@/store/auth";
import AdminDialog from "@/components/auth/buttons/admin-dialog";

export default function Login() {
  const setLocation = useLocation()[1];
  const { user, setUser } = useAuthStore();
  const [isAdminDialogOpen, setAdminDialogOpen] = useState(false);

  const roles = ["admin", "cashier", "customer", ""] as const;

  const formSchema = z.object({
    name: z.string().min(0).max(50),
    role: z.enum(roles, { message: "Debes seleccionar un rol" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      role: "",
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
      setLocation("/non-authorized");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
                    <Input placeholder="Nelsiño" {...field} />
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
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.slice(0,-1).map((role) => (
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
