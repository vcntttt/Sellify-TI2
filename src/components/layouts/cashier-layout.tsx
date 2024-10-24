import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProductSearch from "@/components/cajero/buttons/product-search";
import { ResponsiveModal } from "../responsive-modal";
import ClientSearch from "@/components/cajero/buttons/client-search";
import { RegisterNewClientForm } from "@/components/cajero/buttons/client-form";
import Logo from "@/components/icons/logo";
import { CurrentUser } from "@/types/users";

interface Props {
  user: CurrentUser;
  logOut: () => void;
  total: number;
}

export default function CashierLayout({ user, logOut, total }: Props) {
  return (
    <>
      <header className="bg-white shadow-md p-4 fixed top-0 left-0 w-full flex justify-between items-center z-10">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="size-12 filter invert" />
          </Link>
          <h2 className="text-2xl font-semibold text-gray-800 ml-10">
            Panel de Cajero
          </h2>
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
      <aside className="bg-white shadow-md rounded-lg p-4 w-64 fixed top-20 left-0 border-r border-gray-200 flex flex-col h-auto min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-80px)] overflow-y-auto">
        <div className="flex flex-col gap-4 mb-auto">
          <h3 className="text-lg font-semibold mb-4">Opciones</h3>
          <ResponsiveModal
            trigger={
              <Button className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg shadow-md transition duration-200 w-full">
                Buscar Producto
              </Button>
            }
            title="Buscar Producto"
            description="Buscador de productos"
            className="md:min-w-[620px]"
          >
            <ProductSearch />
          </ResponsiveModal>
          <ResponsiveModal
            trigger={
              <Button className="bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 rounded-lg shadow-md transition duration-200 w-full">
                Buscar Cliente
              </Button>
            }
            title="Buscar Cliente"
            description="Buscador de clientes por nombre o rut"
            className="md:min-w-[620px]"
          >
            <ClientSearch />
          </ResponsiveModal>
          <ResponsiveModal
            trigger={
              <Button className="bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 rounded-lg shadow-md transition duration-200 w-full">
                Registrar Cliente
              </Button>
            }
            title="Registrar Cliente"
            description="Registrar nuevos clientes"
          >
            <RegisterNewClientForm />
          </ResponsiveModal>
        </div>
        <div className="mt-auto space-y-2">
          {user.role === "admin" && (
            <Button
              asChild
              className="rounded-lg shadow-md transition duration-200 w-full whitespace-normal text-center"
            >
              <Link href="/dashboard">Volver al panel de administración</Link>
            </Button>
          )}
          <Button
            asChild
            className="rounded-lg shadow-md transition duration-200 w-full"
            onClick={() => {
              logOut();
            }}
          >
            <Link href="/">Cerrar Sesión</Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
