import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
} from "lucide-react";
import DashboardHome from "@/components/admin/Dashboard";
import Ventas from "@/components/admin/Ventas";
import Analiticas from "@/components/admin/Analiticas";
import Productos from "@/components/admin/products/products-page";

interface Section {
  name : string;
  href : string;
  icon : any;
  component : any;
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