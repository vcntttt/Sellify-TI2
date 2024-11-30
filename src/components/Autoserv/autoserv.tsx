import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import useCarrito from "@/hooks/cajero/use-carrito";
import AutoservLayout from "@/components/layouts/Autoserv-layout";
import ProductTable from "@/components/Autoserv/data-table";
import { columns } from "@/components/Autoserv/columns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PaymentDialog from "@/components/cajero/Payment";
import ProductSummary from "@/components/cajero/buttons/summary";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MetodoPago } from "@/types/ventas";

const AutoservPage = () => {
  const { user, logOut } = useAuthStore();
  const {
    addedProducts,
    code,
    quantity,
    total,
    setCode,
    setQuantity,
    handleKeyPress,
    endSale,
  } = useCarrito();

  const [isDialogOpen, setIsDialogOpen] = useState({
    payment: false,
    receipt: false,
  });

  const handleOpenDialog = (dialogName: "payment" | "receipt") => {
    setIsDialogOpen({
      payment: dialogName === "payment",
      receipt: dialogName === "receipt",
    });
  };

  const handlePaymentMethodSelect = (method: string) => {
    console.log(`Selected payment method: ${method}`);
    setPayMethod(method as MetodoPago);
    handleOpenDialog("receipt");
    setIsDialogOpen((prevState) => ({ ...prevState, payment: false }));
  };

  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [clientRut, setClientRut] = useState<string>("");
  const [payMethod, setPayMethod] = useState<MetodoPago>("efectivo");

  return (
    <AutoservLayout user={user} logOut={logOut} total={total}>
      <section className="shadow-md rounded-lg border mb-7 flex-grow overflow-hidden">
        <div className="overflow-auto max-h-[400px]">
          <ProductTable data={addedProducts} columns={columns} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-md rounded-lg p-5 border border-gray-200 fixed bottom-0 left-0 w-full">
        <h3 className="text-lg font-semibold mb-3 text-center">Ingresar Producto</h3>

        <div className="flex justify-center mb-4">
          <div className="flex gap-6">
            <div className="flex-col items-center gap-2">
              <Label htmlFor="code" className="text-right">
                Código
              </Label>
              <Input
                id="code"
                type="number"
                value={code ?? ""}
                onChange={(e) => setCode(parseInt(e.target.value))}
                placeholder="001"
                className="w-full"
                required
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex-col items-center gap-2">
              <Label htmlFor="quantity" className="text-right">
                Cantidad
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full"
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div className="flex gap-4 mb-2 sm:mb-0">
            {user.role === "admin" && (
              <Button asChild className="rounded-lg shadow-md transition duration-200">
                <Link href="/dashboard">Volver al panel</Link>
              </Button>
            )}
            <Button asChild className="rounded-lg shadow-md transition duration-200">
              <Link href="/">Cerrar sesión</Link>
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              variant="destructive"
              className="rounded-lg shadow-md transition duration-200"
              onClick={endSale}
            >
              Cancelar Venta
            </Button>
            <Button
              size="lg"
              className="rounded-lg shadow-md transition duration-200"
              onClick={() => setPaymentDialogOpen(true)}
            >
              Finalizar Compra
            </Button>
          </div>
        </div>
      </footer>

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        onSelectPaymentMethod={handlePaymentMethodSelect}
        totalCost={total}
        setClientRUT={setClientRut}
      />

      <Dialog open={isDialogOpen.receipt} onOpenChange={() => setIsDialogOpen((prevState) => ({ ...prevState, receipt: false }))}>
        <DialogContent className="max-w-lg w-full bg-white rounded-lg p-6 shadow-md">
          <DialogHeader>
            <DialogTitle>Boleta</DialogTitle>
            <DialogDescription>Detalle de productos y total.</DialogDescription>
          </DialogHeader>
          <ProductSummary
            clientRut={clientRut}
            payMethod={payMethod}
            products={addedProducts}
            total={total}
            onClose={() => {
              setIsDialogOpen((prevState) => ({
                ...prevState,
                receipt: false,
              }));
              endSale();
            }}
          />
        </DialogContent>
      </Dialog>
    </AutoservLayout>
  );
};

export default AutoservPage;
