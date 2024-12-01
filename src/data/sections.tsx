import { Home, Package, ShoppingCart, UserIcon, Bell } from "lucide-react";
import DashboardHome from "@/components/admin/dashboard/dashboard";
import Ventas from "@/components/admin/ventas/ventas-page";
import Productos from "@/components/admin/products/products-page";
import UsersPage from "@/components/admin/users/users-page";
import Registro from "@/components/admin/registro/registro-page";
import { getUsers } from "@/api/users";
import ComprasPage from "@/components/admin/compras/compras-page";

export interface Section {
  name: string;
  href: string;
  icon: JSX.Element;
  component: any;
  prefetch?: {
    key: string[];
    fn: () => Promise<any>;
  }
}

export const sections: Section[] = [
  {
    name: "Panel",
    href: "/dashboard",
    icon: <Home className="size-4"/>,
    component: DashboardHome,
  },
  {
    name: "Productos",
    href: "/dashboard/productos",
    icon: <Package className="size-4"/>,
    component: Productos,
  },
  {
    name: "Ventas",
    href: "/dashboard/ventas",
    icon: <ShoppingCart className="size-4"/>,
    component: Ventas,
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    icon: <UserIcon className="size-4"/>,
    component: UsersPage,
    prefetch: {
      key: ["users"],
      fn: getUsers,
    },
  },
  {
    name: "Registros",
    href: "/dashboard/registro",
    icon: <Bell className="size-4"/>,
    component: Registro,
  },
  {
    name: "Compra",
    href: "/dashboard/compras",
    icon: <ShoppingCart className="size-4"/>,
    component: ComprasPage,
  },
];
