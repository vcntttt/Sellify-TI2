import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categorySchema as formSchema } from "@/schemas/products";
import { useCategories, useCategoryMutation } from "@/hooks/query/use-categories";
import { ShowNotification } from "@/components/NotificationProvider";
import { format } from "date-fns";

interface Props {
  onClose: () => void;
}

export function AddCategory({ onClose }: Props) {
  const { data: categories } = useCategories();
  const categoryMutation = useCategoryMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      },
    },
);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const existingCategory = categories?.find((category) => category === values.name);
    if (existingCategory) {
      const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
      ShowNotification("La categoría ya existe.","warning", errorTime);
      return
    }
    try{
      categoryMutation.mutate(values.name);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2 *:w-1/3 pt-4 justify-end">
          <Button type="submit">Agregar</Button>
        </div>
      </form>
    </Form>
  );
}