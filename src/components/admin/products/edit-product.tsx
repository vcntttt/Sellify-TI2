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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Producto } from "@/types/products";
import { productSchema as formSchema } from "@/schemas/products";
import CustomSlider from "@/components/admin/products/custom-slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";
import { useCategories } from "@/hooks/query/use-categories";
import { useEditProductMutation } from "@/hooks/query/use-products";

interface Props {
  product: Producto;
  onClose: () => void;
}

export function EditProductForm({ product, onClose }: Props) {
  const { data: categories = [] } = useCategories();
  const editProductMutation = useEditProductMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      stock: product.stock,
      description: product.description ?? "",
      price:
        typeof product.price === "string"
          ? parseInt(product.price)
          : product.price,
      category: product.category,
      createdAt: format(new Date(product.createdAt), "yyyy-MM-dd"),
      dueDate: format(new Date(product.dueDate), "yyyy-MM-dd"),
      codigoBarras: product.codigoBarras,
      discount: {
        value: product.discount?.value ?? 0,
        dueDate: format(new Date(product.dueDate), "yyyy-MM-dd"),
      },
    },
  });

  // useEffect(() => {
  //   console.log("🚀 ~ useEffect ~ form.formState.errors:", form.formState.errors);
  // }, [form.formState.errors]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      editProductMutation.mutate({
        ...values,
        createdAt: format(new Date(values.createdAt), "yyyy-MM-dd"),
        dueDate: format(new Date(values.dueDate), "yyyy-MM-dd"),
        discount: {
          value: values.discount?.value ?? 0,
          dueDate: values.discount?.dueDate
            ? format(new Date(values.discount.dueDate), "yyyy-MM-dd")
            : null,
        },
      });
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
              <FormLabel>Nombre del producto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codigoBarras"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo de Barras</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category} key={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de vencimiento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", { locale: es })
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    locale={es}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Descuento</AccordionTrigger>
            <AccordionContent className="space-y-6">
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descuento: {field.value?.value ?? 0}%</FormLabel>
                    <FormControl>
                      <CustomSlider
                        value={field.value?.value ?? 0}
                        onChange={(value) => {
                          form.setValue("discount", {
                            value,
                            dueDate: field.value?.dueDate ?? undefined,
                          });
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount.dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de vencimiento de descuento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value ?? "")}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          locale={es}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex gap-x-2 *:w-1/2 pt-4">
          <Button variant="destructive">Retirar producto</Button>
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </Form>
  );
}
