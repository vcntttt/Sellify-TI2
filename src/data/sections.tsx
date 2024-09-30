import { Home, LineChart, Package, ShoppingCart, UserIcon } from "lucide-react";
import DashboardHome from "@/components/admin/dashboard";
import Ventas from "@/components/admin/ventas/ventas-page";
import Analiticas from "@/components/admin/analiticas/analitics-page";
import Productos from "@/components/admin/products/products-page";
import UsersPage from "@/components/admin/users/users-page";
import { getUsers } from "@/api/users";

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
    name: "Analíticas",
    href: "/dashboard/analiticas",
    icon: <LineChart className="size-4"/>,
    component: Analiticas,
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
];
