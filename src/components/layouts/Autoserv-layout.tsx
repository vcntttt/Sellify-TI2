import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProductSearch from "@/components/cajero/buttons/product-search";
import { ResponsiveModal } from "../responsive-modal";
import Logo from "@/components/icons/logo";
import { CurrentUser } from "@/types/users";
import VerPoints from "@/components/Autoserv/buttons/ver-puntos";

interface Props {
  user: CurrentUser;
  logOut: () => void;
  total: number;
  children: React.ReactNode;
}

export default function AutoservLayout({ user, total, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-white shadow-md p-4 fixed top-0 left-0 w-full flex justify-between items-center z-10">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="size-12 filter invert" />
            <span className="text-xl">Caja Autoservicio</span>
          </Link>
        </div>
        <div className="text-gray-600 flex flex-col items-end">
          <p className="text-sm">
            Cajero: <span className="font-medium">{user.name}</span>
          </p>
          <p className="text-xl font-semibold mt-1">
            Total: <span className="font-bold text-blue-600">${total}</span>
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-8xl mx-auto w-full p-7 mt-16">
        <div className="flex gap-3 mb-4"> 
          <ResponsiveModal
            trigger={
              <Button className="rounded-lg shadow-md transition duration-200 whitespace-normal text-center">
                Buscar Productos
              </Button>
            }
            title="Buscar Productos"
            description="Buscador de Productos"
            className="md:min-w-[620px]"
          >
            <ProductSearch />
          </ResponsiveModal>
          <ResponsiveModal
            trigger={
              <Button className="rounded-lg shadow-md transition duration-200 whitespace-normal text-center">
                Ver puntos
              </Button>
            }
            title="Buscar Cliente"
            description="Buscador de clientes por nombre o rut"
            className="md:min-w-[620px]"
          >
            <VerPoints />
          </ResponsiveModal>
        </div>
        {children}
      </main>
    </div>
  );
}
