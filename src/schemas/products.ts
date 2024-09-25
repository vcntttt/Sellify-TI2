import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, { message: "El nombre del producto no puede estar vacío" }),
  stock: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().min(0)
  ),
  price: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().min(0)
  ),
  category: z.string(),
  createdAt: z.date(),
  dueDate: z.date(),
  discount: z
    .object({
      value: z.preprocess(
        (val) => (typeof val === "string" ? parseInt(val, 10) : val),
        z.number().min(0).max(100)
      ),
      dueDate: z
        .date({
          required_error: "Debe ingresar una fecha de vencimiento de descuento",
        })
        .nullable()
        .optional(),
    })
    .optional()
    .refine((discount) => {
      if (discount?.value && discount.value > 0) {
        return discount.dueDate !== null && discount.dueDate !== undefined;
      }
      return true;
    }),
});

export const categorySchema = z.object({
  name: z.string().min(1, { message: "El nombre de la categoria no puede estar vacío" }),
});