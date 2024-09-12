import productSchema from "@/components/admin/products/productSchema"

export type Products = z.infer<typeof productSchema>