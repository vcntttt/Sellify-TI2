import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge"
import { ProductDiscount } from "@/types/products"; 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);
}

export function formatDiscount(discount?: ProductDiscount) {
  if (!discount) return { isValid: false, value: 0, dueDate: undefined };

  const currentDate = new Date();
  const isValid = discount?.dueDate ? currentDate < discount.dueDate : true;
  const value = discount?.value ?? 0; 
  const dueDate = discount?.dueDate ?? undefined
  return { isValid, value, dueDate };
}

export function formatDate(date: Date) {
  return format((date), "dd-MM-yyyy", { locale: es });
}

export const sleep = (ss: number) => new Promise((resolve) => setTimeout(resolve, 1000 * ss));

export function formatDatesFromRespone(date: string | Date) {
  return format(new Date(date), "yyyy-MM-dd");
}