import { type ClassValue, clsx } from "clsx"
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);
}

export function formatDate(date: Date) {
  return format(addDays(date, 1), "dd-MM-yyyy", { locale: es });
}
