import { Link } from "wouter";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/use-auth";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import ProductSearch from "@/components/cashier/buttons/product-search";
import { RegisterNewClientForm } from "@/components/cashier/buttons/client-form";
import ProductSummary from "@/components/cashier/buttons/summary";
import useCarrito from "@/hooks/use-carrito";

const CajeroLayout = () => {
  const { user } = useAuthStore();
  const {
    addedProducts,
    code,
    quantity,
    total,
    isOpenBoleta,
    setCode,
    setQuantity,
    handleAddProduct,
    handleKeyPress,
    setIsOpenBoleta,
    endSale,
  } = useCarrito();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 fixed top-0 left-0 w-full flex justify-between items-center z-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          Panel de Cajero
        </h2>
        <div className="text-gray-600 flex flex-col items-end">
          <p className="text-sm">
            Cajero: <span className="font-medium">{user.name}</span>
          </p>
          <p className="text-xl font-semibold mt-1">
            Total: <span className="font-bold text-blue-600">${total}</span>
          </p>
        </div>
      </header>

      <div className="flex flex-1 pt-20">
        {/* Sidebar Section */}
        <aside className="bg-white shadow-md rounded-lg p-4 w-64 fixed top-20 left-0 border-r border-gray-200 flex flex-col h-auto min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col gap-4 mb-auto">
            <h3 className="text-lg font-semibold mb-4">Opciones</h3>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 rounded-lg shadow-md transition duration-200 w-full">
                  Ver Productos
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Productos</DialogTitle>
                  <DialogDescription>
                    Buscador de productos por código.
                  </DialogDescription>
                  <ProductSearch />
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <Button className="bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 rounded-lg shadow-md transition duration-200 w-full">
                  Registrar Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Registrar Cliente</DialogTitle>
                  <DialogDescription>
                    Registrar nuevo cliente.
                  </DialogDescription>
                </DialogHeader>
                <RegisterNewClientForm />
              </DialogContent>
            </Dialog>

            <Dialog open={isOpenBoleta} onOpenChange={setIsOpenBoleta}>
              <DialogTrigger>
                <Button className="bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900 rounded-lg shadow-md transition duration-200 w-full">
                  Finalizar Compra
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Boleta</DialogTitle>
                  <DialogDescription>
                    Detalle de productos y total.
                  </DialogDescription>
                </DialogHeader>
                <ProductSummary
                  products={addedProducts}
                  total={total}
                  onClose={endSale}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-auto space-y-2">
            {user.role === "admin" && (
              <Button
                asChild
                className="bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900 rounded-lg shadow-md transition duration-200 w-full whitespace-normal text-center"
              >
                <Link href="/dashboard">Volver al panel de administración</Link>
              </Button>
            )}
            <Button
              asChild
              className="bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900 rounded-lg shadow-md transition duration-200 w-full"
            >
              <Link href="/">Cerrar Sesión</Link>
            </Button>
          </div>
        </aside>

        {/* Main Content Section */}
        <main className="flex-1 ml-64 p-6 flex flex-col">
          <section className="bg-white shadow-md rounded-lg p-8 border border-gray-200 mb-6 flex-grow min-h-[400px]">
            <h3 className="text-lg font-semibold mb-10">
              Productos en la Compra
            </h3>
            {/* Contenedor con scroll para la tabla */}
            <div className="max-h-64 overflow-y-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-300 border-b border-gray-300 sticky top-0">
                  <tr className="*:text-black *:text-left *:py-2 *:px-4">
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Precio Total</th>
                  </tr>
                </thead>
                <tbody>
                  {addedProducts.map((product, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-2 px-4">{product.id}</td>
                      <td className="py-2 px-4">{product.name}</td>
                      <td className="py-2 px-4">{product.quantity}</td>
                      <td className="py-2 px-4">${product.price}</td>
                      <td className="py-2 px-4">${product.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col"
            style={{ minHeight: "120px" }}
          >
            <h3 className="text-lg font-semibold mb-4">Ingresar Producto</h3>
            <div className="flex gap-4">
              <div className="flex-col items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Código
                </Label>
                <Input
                  id="code"
                  type="number"
                  value={code ?? ""}
                  onChange={(e) => setCode(parseInt(e.target.value))}
                  placeholder="001"
                  className="col-span-3"
                  required
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="flex-col items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Cantidad
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="col-span-3"
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                size="lg"
                className="bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 rounded-lg shadow-md transition duration-200"
                onClick={handleAddProduct}
              >
                Confirmar
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900 rounded-lg shadow-md transition duration-200"
              >
                Rechazar
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CajeroLayout;
