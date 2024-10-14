import { useState } from "react";
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
import { useClients } from "@/hooks/query/use-clients";
import { addPoints, updateUserPoints } from "@/api/Client"; 

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPaymentMethod: (method: string, rut: string) => void;
}

const PaymentDialog = ({
  isOpen,
  onClose,
  onSelectPaymentMethod,
}: PaymentDialogProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [customerRUT, setCustomerRUT] = useState<string>("");
  const [isRUTConfirmed, setIsRUTConfirmed] = useState(false);
  const [clientName, setClientName] = useState<string | null>(null); 
  const [clientSurname, setClientSurname] = useState<string | null>(null); 
  const [skipRegistration, setSkipRegistration] = useState(false);
  const { data: clients } = useClients(); 
  const client = clients?.find(client => client.rut === customerRUT); 

  const handlePaymentSelection = (method: string) => {
    setSelectedMethod(method);
  };

  const confirmRUT = () => {
    setIsRUTConfirmed(true);
    if (client) {
      setClientName(client.nombre);
      setClientSurname(client.apellido);
    } else {
      setClientName(null);
      setClientSurname(null);
    }
  };

  const confirmPayment = async () => {
    if (selectedMethod) {
      setIsPaymentConfirmed(true);
      try {
        const pointsToAdd = 10;
  
        if (client) {
          const newPoints = client.puntos + pointsToAdd; 
          await updateUserPoints(customerRUT, newPoints); 
        } else {
          await addPoints(customerRUT, pointsToAdd);
        }
      } catch (error) {
        console.error("Error actualizando los puntos:", error);
      }
    }
  };

  const completePayment = () => {
    if (selectedMethod) {
      onSelectPaymentMethod(selectedMethod, customerRUT);
      resetPaymentState();
      onClose();
    }
  };

  const resetPaymentState = () => {
    setSelectedMethod(null);
    setIsPaymentConfirmed(false);
    setIsRUTConfirmed(false);
    setCustomerRUT("");
    setClientName(null);
    setClientSurname(null); 
    setSkipRegistration(false); 
  };

  const progressValue = isPaymentConfirmed 
    ? 100 
    : selectedMethod 
    ? 66 
    : isRUTConfirmed 
    ? 33 
    : 0;

  const dialogTitle = isPaymentConfirmed
    ? "Pago Confirmado"
    : isRUTConfirmed && !client && !skipRegistration
    ? "Registrar Cliente"
    : isRUTConfirmed
    ? "Seleccionar Método de Pago"
    : "Rut del Cliente";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {isPaymentConfirmed
              ? "Su pago ha sido confirmado."
              : isRUTConfirmed && !client && !skipRegistration
              ? "Este RUT no está registrado. Por favor, registre al cliente."
              : isRUTConfirmed
              ? "Elija un método de pago para continuar."
              : "Ingrese el RUT del cliente"}
          </DialogDescription>
        </DialogHeader>

        <Progress value={progressValue} className="mt-2 mb-4" />

        {isPaymentConfirmed ? (
          <div className="flex flex-col gap-4">
            <p className="text-base">
              Su pago con el método:{" "}
              <strong className="font-semibold">{selectedMethod}</strong> ha sido confirmado.
            </p>
            <Button
              onClick={completePayment}
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

            {isRUTConfirmed && client ? ( 
              <>
                <p className="text-base">
                  Cliente: <strong className="font-semibold">{clientName} {clientSurname}</strong>
                </p>
                <Button
                  onClick={() => handlePaymentSelection("Efectivo")}
                  className="rounded-lg shadow-md transition duration-200"
                >
                  Pagar en Efectivo
                </Button>
                <Button
                  onClick={() => handlePaymentSelection("Tarjeta de Crédito/Débito")}
                  className="rounded-lg shadow-md transition duration-200"
                >
                  Pagar con Tarjeta de Crédito/Débito
                </Button>
              </>
            ) : isRUTConfirmed && !client && !skipRegistration && (
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
                  onClick={() => handlePaymentSelection("Efectivo")}
                  className="rounded-lg shadow-md transition duration-200"
                >
                  Pagar en Efectivo
                </Button>
                <Button
                  onClick={() => handlePaymentSelection("Tarjeta de Crédito/Débito")}
                  className="rounded-lg shadow-md transition duration-200"
                >
                  Pagar con Tarjeta de Crédito/Débito
                </Button>
              </div>
            )}

            {selectedMethod && (
              <div className="flex flex-col gap-4">
                <p className="text-base">
                  ¿Está seguro que desea realizar el pago con el método:{" "}
                  <strong className="font-semibold">{selectedMethod}</strong>?
                </p>
                <div className="flex justify-between">
                  <Button onClick={resetPaymentState} className="bg-gray-300 hover:bg-gray-400">
                    Volver
                  </Button>
                  <Button
                    onClick={confirmPayment}
                    className="rounded-lg shadow-md transition duration-200"
                  >
                    Confirmar
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
