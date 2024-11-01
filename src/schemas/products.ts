import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, { message: "El nombre del producto no puede estar vacío" }),
  description: z.string().max(50, { message: "La descripción no puede exceder los 50 caracteres" }),
  codigoBarras: z
    .string()
    .length(13, { message: "El código de barras debe tener exactamente 13 caracteres" }),
  stock: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().min(1, { message: "El stock debe ser mayor a 0" })
  ),
  price: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().min(1, { message: "El precio debe ser mayor a 0" })
  ),
  category: z.string().min(1, { message: "Debe seleccionar una categoría" }),
  createdAt: z.date(),
  dueDate: z.date({ required_error: "La fecha de vencimiento es obligatoria" }),
  discount: z
    .object({
      value: z.preprocess(
        (val) => (typeof val === "string" ? parseInt(val, 10) : val),
        z.number().min(0).max(100, { message: "El descuento debe estar entre 0 y 100" })
      ),
      dueDate: z.date().nullable().optional(),
    })
    .optional()
    .refine((discount) => {
      if (discount?.value && discount.value > 0) {
        return discount.dueDate !== null && discount.dueDate !== undefined;
      }
      return true;
    }, {
      message: "Debe ingresar una fecha de vencimiento para el descuento si el valor es mayor que 0"
    }),
});

export const categorySchema = z.object({
  name: z.string().min(1, { message: "El nombre de la categoria no puede estar vacío" }),
});