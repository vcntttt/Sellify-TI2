import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
} from "lucide-react";
import DashboardHome from "@/components/admin/dashboard";
import Ventas from "@/components/admin/ventas/ventas-page";
import Analiticas from "@/components/admin/analiticas/analitics-page";
import Productos from "@/components/admin/products/products-page";
import { FC } from "react" // Funcional Component

interface Section {
  name : string;
  href : string;
  icon : any;
  component : FC;
}

export const sections: Section[] = [
  {
    name: "Panel",
    href: "/dashboard",
    icon: Home,
    component: DashboardHome,
  },
  { 
    name: "Productos",
    href: "/dashboard/productos",
    icon: Package,
    component: Productos,
  },
  {
    name: "Ventas",
    href: "/dashboard/ventas",
    icon: ShoppingCart,
    component: Ventas,
  },
  {
    name: "Analíticas",
    href: "/dashboard/analiticas",
    icon: LineChart,
    component: Analiticas,
  },
]