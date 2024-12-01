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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { useLocation } from "wouter";
import Logo from "../icons/logo";

export default function Login() {
  const setLocation = useLocation()[1];
  const { setUser } = useAuthStore();

  const validateRut = (rut: string) => {
    const cleanRut = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  
    if (cleanRut.length < 2) return false;
  
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1); 
  
    if (!/^\d+$/.test(body)) return false;
  
    let sum = 0;
    let multiplier = 2;
  
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i], 10) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
  
    const calculatedDV = 11 - (sum % 11);
    const expectedDV = calculatedDV === 11 ? "0" : calculatedDV === 10 ? "K" : calculatedDV.toString();
  
    return dv === expectedDV;
  };

  const formSchema = z.object({
    rut: z
      .string()
      .min(8, { message: "Ingrese un RUT válido" })
      .max(12, { message: "Ingrese un RUT válido" })
      .refine(validateRut, { message: "El RUT ingresado no es válido" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .max(50, { message: "La contraseña debe tener menos de 50 caracteres" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rut: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
   try{
    const { token, info } = await login({
      rut: values.rut,
      contrasena: values.password,
    });

    setUser({ name: info.nombre, role: info.tipo_usuario, access_token: token, id_usuario: info.id_usuario, rut: values.rut, apellido: info.apellido});

    if (!token) {
      setLocation("/non-authorized");
    }

    if (info.tipo_usuario === "admin") {
      setLocation("/dashboard");
    } else if (info.tipo_usuario === "cajero") {
      setLocation("/cashier");
    } else {
      setLocation("/non-authorized");
    }
  } catch (error) {
     console.log(error);
   }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-md flex flex-col items-center justify-center">
      <h1 className="text-2xl uppercase font-bold">S e l l i f y</h1>
        <Logo className="size-48 filter invert"/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rut</FormLabel>
                  <FormControl>
                    <Input placeholder="211234567" {...field} />
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
                    <Input {...field} type="password"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex w-full">Entrar</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
