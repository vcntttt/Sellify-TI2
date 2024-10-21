import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import ProductSummary from "@/components/cajero/buttons/summary";
import useCarrito from "@/hooks/cajero/use-carrito";
import ProductTable from "@/components/cajero/data-table";
import PaymentDialog from "@/components/cajero/Payment";
import { useState } from "react";
import CashierLayout from "../layouts/cashier-layout";
import { columns } from '@/components/cajero/columns';

const CashierPage = () => {
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
    handleOpenDialog("receipt"); 
    setIsDialogOpen((prevState) => ({ ...prevState, payment: false }));
  };

  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const dynamicTotalCost = total;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1 pt-20">
        <CashierLayout
          user={user}
          logOut={logOut}
          total={total}
        />

        <main className="flex-1 ml-64 p-6 flex flex-col">
          <section className="shadow-md rounded-lg border mb-7 flex-grow">
            <ProductTable data={addedProducts} columns={columns}/>
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
                variant={"destructive"}
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
          </section>
        </main>
      </div>

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        onSelectPaymentMethod={handlePaymentMethodSelect}
        totalCost={dynamicTotalCost}
      />

      {/* Receipt Dialog */}
      <Dialog
        open={isDialogOpen.receipt}
        onOpenChange={() =>
          setIsDialogOpen((prevState) => ({ ...prevState, receipt: false }))
        }
      >
        <DialogContent className="min-w-[425px]">
          <DialogHeader>
            <DialogTitle>Boleta</DialogTitle>
            <DialogDescription>Detalle de productos y total.</DialogDescription>
          </DialogHeader>
          <ProductSummary
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
    </div>
  );
};

export default CashierPage;
