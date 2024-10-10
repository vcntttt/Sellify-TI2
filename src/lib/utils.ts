import { type ClassValue, clsx } from "clsx"
import { format, addDays } from "date-fns";
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
  const currentDate = new Date();
  const isValid = discount?.dueDate ? currentDate < discount.dueDate : true;
  const value = discount?.value ?? 0; 
  return { isValid, value };
}

export function formatDate(date: Date) {
  return format(addDays(date, 1), "dd-MM-yyyy", { locale: es });
}

export const sleep = (ss: number) => new Promise((resolve) => setTimeout(resolve, 1000 * ss));
