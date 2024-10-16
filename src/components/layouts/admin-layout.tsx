import { Link } from "wouter";
import { sections } from "@/data/sections";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Botonera from "@/components/admin/layout-buttons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/icons/logo";
import AdminLayoutItem from "./admin-layout-item";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-slate-800 md:block h-screen sticky top-0">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 justify-between items-center px-4 lg:h-[60px]">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-white"
            >
              <Logo className="size-14"/>
              <span className="text-md uppercase">S e l l i f y</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sections.map((section) => (
                <AdminLayoutItem key={section.href} section={section} />
              ))}
            </nav>
          </div>
          <div className="mt-auto mb-4 mx-4">
            <Botonera variant="dark" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="md:hidden flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo className="h-6 w-6" />
                  <span className="sr-only text-red-">Sellify</span>
                </Link>
                {sections.map((section) => (
                  <Link
                    key={section.name}
                    href={section.href}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    {section.icon}
                    {section.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-y-4">
                <Botonera variant="light" />
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
