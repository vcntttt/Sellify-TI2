import { usePayment } from "@/hooks/cajero/use-payment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RegisterNewClientForm } from "@/components/cajero/buttons/client-form";
import CardForm from "./CardForm";
import { MetodoPago } from "@/types/ventas";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPaymentMethod: (method: MetodoPago, rut: string) => void;
  totalCost: number;
}

const PaymentDialog = ({
  isOpen,
  onClose,
  onSelectPaymentMethod,
  totalCost,
}: PaymentDialogProps) => {
  const {
    selectedMethod,
    isPaymentConfirmed,
    customerRUT,
    isRUTConfirmed,
    clientName,
    clientSurname,
    skipRegistration,
    sufficientPoints,
    handlePaymentSelection,
    confirmRUT,
    confirmPayment,
    completePayment,
    resetPaymentState,
    setCustomerRUT,
    client,
    setSkipRegistration,
  } = usePayment(totalCost);

  const progressValue = isPaymentConfirmed
    ? 100
    : selectedMethod
    ? 66
    : isRUTConfirmed
    ? 33
    : 0;

    const dialogTitle = isPaymentConfirmed
    ? "Pago Confirmado"
    : selectedMethod === "debito" || selectedMethod === "credito"
    ? "Pagar con Tarjeta (Débito / Crédito)"
    : selectedMethod
    ? `Pago con ${selectedMethod}`
    : isRUTConfirmed && (client || skipRegistration)
    ? "Seleccionar Método de Pago"
    : isRUTConfirmed && !skipRegistration
    ? "Registrar Cliente"
    : "Rut del Cliente";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {isPaymentConfirmed
              ? "Su pago ha sido confirmado."
              : isRUTConfirmed && client
              ? "Elija un método de pago para continuar."
              : isRUTConfirmed && !skipRegistration
              ? "Este RUT no está registrado. Por favor, registre al cliente."
              : "Ingrese el RUT del cliente"}
          </DialogDescription>
        </DialogHeader>

        <Progress value={progressValue} className="mt-2 mb-4" />

        {isPaymentConfirmed ? (
          <div className="flex flex-col gap-4">
            <p className="text-base">
              Su pago con el método:{" "}
              <strong className="font-semibold">{selectedMethod}</strong> ha sido
              confirmado.
            </p>
            <Button
              onClick={() => completePayment(onSelectPaymentMethod, onClose)}
              className="rounded-lg shadow-md transition duration-200"
            >
              Finalizar y Ver Boleta
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {!isRUTConfirmed && (
              <div className="flex flex-col">
                <label htmlFor="customer-rut" className="text-sm font-medium">
                  RUT del Cliente
                </label>
                <input
                  id="customer-rut"
                  type="text"
                  value={customerRUT}
                  onChange={(e) => setCustomerRUT(e.target.value)}
                  placeholder="Ej: 12.345.678-9"
                  className="border border-gray-300 rounded-lg p-2 mt-1"
                />
                <Button
                  onClick={confirmRUT}
                  className="rounded-lg shadow-md transition duration-200 mt-2"
                  disabled={!customerRUT}
                >
                  Confirmar RUT
                </Button>
              </div>
            )}

            {isRUTConfirmed && client && (
              <>
                <p className="text-base">
                  Cliente:{" "}
                  <strong className="font-semibold">
                    {clientName} {clientSurname}
                  </strong>
                </p>
                <Button
                  onClick={() => handlePaymentSelection("efectivo")}
                  className="rounded-lg shadow-md transition duration-200"
                >
                  Pagar en Efectivo
                </Button>
                <Button
                  onClick={() => handlePaymentSelection("debito")}
                  className="rounded-lg shadow-md transition duration-200"
                >
                  Pagar con Tarjeta (Débito / Crédito)
                </Button>
                {sufficientPoints && (
                  <Button
                    onClick={() => handlePaymentSelection("Puntos")}
                    className="rounded-lg shadow-md transition duration-200"
                  >
                    Pagar con Puntos
                  </Button>
                )}
              </>
            )}

            {isRUTConfirmed && !client && !skipRegistration && (
              <>
                <RegisterNewClientForm />
                <Button
                  onClick={() => setSkipRegistration(true)}
                  className="rounded-lg shadow-md transition duration-200 mt-2"
                >
                  Continuar sin Registrar
                </Button>
              </>
            )}

            {skipRegistration && (
              <div className="flex flex-col gap-4">
                <p className="text-base">
                  Ha decidido continuar sin registrar al cliente.
                </p>
                <Button
                  onClick={() => handlePaymentSelection("efectivo")}
                  className="rounded-lg shadow-md transition duration-200"
                >
                  Pagar en Efectivo
                </Button>
                <Button
                  onClick={() => handlePaymentSelection("debito")}
                  className="rounded-lg shadow-md transition duration-200"
                >
                  Pagar con Tarjeta (Débito / Crédito)
                </Button>
              </div>
            )}

            {selectedMethod === "debito" || selectedMethod === "credito" ? (
              <div className="mt-6">
                <CardForm
                  confirmPayment={confirmPayment}
                  resetPaymentState={resetPaymentState}
                />
              </div>
            ) : null}

            {selectedMethod && selectedMethod !== "debito" && selectedMethod !== "credito" && (
              <div className="flex flex-col gap-4">
                <p className="text-base">
                  ¿Está seguro que desea realizar el pago con el método:{" "}
                  <strong className="font-semibold">{selectedMethod}</strong>?
                </p>
                <div className="flex justify-between">
                  <Button
                    onClick={resetPaymentState}
                    className="rounded-lg shadow-md transition duration-200"
                  >
                    Volver
                  </Button>
                  <Button
                    onClick={confirmPayment}
                    className="rounded-lg shadow-md transition duration-200"
                  >
                    Confirmar Pago
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
