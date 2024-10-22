import { Home, LogOut, Package, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import clsx from "clsx";
import Logo from "@/components/icons/logo";
import { useAuthStore } from "@/store/auth";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: any;
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
];

export function AppSidebar() {
  const [location] = useLocation();
  const { open, setOpen } = useSidebar();
  const { logOut } = useAuthStore();
  const isTablet = useMediaQuery("(max-width: 1030px)");
  const [manualToggle, setManualToggle] = useState(false);

  useEffect(() => {
    const open = isTablet ? false : manualToggle
    if (isTablet) {
      setOpen(open);
    }
    setOpen(open)
  }, [isTablet, manualToggle, setOpen]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div
          className={clsx("flex justify-between items-center py-2", {
            "flex-col": !open,
          })}
        >
          <Link
            href="/"
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
          <SidebarTrigger
            onClick={() => setManualToggle(!manualToggle)}
            className="md:flex hidden justify-center text-left font-normal hover:bg-slate-700 hover:text-white"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-2">
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-700 active:text-white",
                  {
                    "bg-slate-700 text-white": location === item.url,
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
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-700 active:text-white"
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
              onClick={() => logOut()}
              asChild
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-700 active:text-white"
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
