import { Link, useLocation } from "wouter";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

export default function AdminLayoutButtons({ variant }: { variant: "light" | "dark" }) {
  const setLocation = useLocation()[1];
  const styles = clsx(
    "w-full hover:bg-slate-700 hover:text-white",
    variant === "dark" ? "bg-white text-slate-800" : "bg-slate-800 text-white"
  );

  return (
    <div className="flex flex-col gap-y-2">
      <Button className={styles} asChild>
        <Link href="/cashier">Entrar como Cajero</Link>
      </Button>
      <Button className={styles} onClick={() => setLocation("/")}>
        Cerrar Sesión
      </Button>
    </div>
  );
}
