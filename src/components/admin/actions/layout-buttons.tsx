import { Link, useLocation } from "wouter";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddUserForm from "@/components/admin/actions/add-user-form";

export default function AdminLayoutButtons({ variant }: { variant: "light" | "dark" }) {
  const setLocation = useLocation()[1];
  const styles = clsx(
    "w-full hover:bg-slate-700 hover:text-white",
    variant === "dark" ? "bg-white text-slate-800" : "bg-slate-800 text-white"
  );

  return (
    <div className="flex flex-col gap-y-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className={styles}>Agregar Usuario</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Usuario</DialogTitle>
            <DialogDescription>
              Registra a tus nuevos empleados.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col py-4">
            <AddUserForm/>
          </div>
        </DialogContent>
      </Dialog>
      <Button className={styles} asChild>
        <Link href="/cashier">Entrar como Cajero</Link>
      </Button>
      <Button className={styles} onClick={() => setLocation("/")}>
        Cerrar Sesión
      </Button>
    </div>
  );
}
