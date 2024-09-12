import { categories } from "@/data/categories"
import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(2).max(50),
  stock: z.number(),
  price: z.number(),
  category: z.enum(categories),
  createdAt: z.date(),
  dueDate: z.date(),
  discount: z.number().min(0).max(100),
})