import {
  Bell,
  Home,
  LogOut,
  type LucideIcon,
  Package,
  PencilRuler,
  CircleDollarSign,
  ShoppingCart,
  UserIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import clsx from "clsx";
import Logo from "@/components/icons/logo";
import { useAuthStore } from "@/store/auth";
import ThemeCustomizer from "./theme-customizer";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

const items: SidebarItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Productos",
    url: "/dashboard/productos",
    icon: Package,
  },
  {
    title: "Ventas",
    url: "/dashboard/ventas",
    icon: ShoppingCart,
  },
  {
    title: "Usuarios",
    url: "/dashboard/users",
    icon: UserIcon,
  },
  {
    title: "Registros",
    url: "/dashboard/registro",
    icon: Bell,
  },
  {
    title: "Compras",
    url: "/dashboard/compras",
    icon: CircleDollarSign,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const [location] = useLocation();
  const { logOut } = useAuthStore();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div
          className={clsx("flex justify-between items-center py-2", {
            "flex-col": !open,
          })}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-white"
          >
            <Logo className="size-14" />
            <span
              className={clsx("text-md uppercase", {
                hidden: !open,
              })}
            >
              S e l l i f y
            </span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Secciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location === item.url}
                    asChild
                    className={clsx(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all", 
                      {
                        "text-white/50": location !== item.url,
                      }
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <SidebarMenuButton
                asChild
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                )}
              >
                <PopoverTrigger>
                  <PencilRuler />
                  <span>Customizar interfaz</span>
                </PopoverTrigger>
              </SidebarMenuButton>
              <PopoverContent>
                <ThemeCustomizer />
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              )}
            >
              <Link href="/cashier">
                <ShoppingCart />
                <span>Ir al panel de cajero</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              )}
            >
              <Link href="/autoserv">
                <ShoppingCart />
                <span>Caja Autoservicio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logOut()}
              asChild
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              )}
            >
              <Link href="/">
                <LogOut />
                <span>Cerrar Sesión</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
