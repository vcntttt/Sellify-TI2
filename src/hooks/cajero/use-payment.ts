// hooks/usePaymentDialog.ts
import { useState } from "react";
import { useClientStore } from "@/store/client";

export const usePaymentDialog = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [customerRUT, setCustomerRUT] = useState<string>("");
  const [isRUTConfirmed, setIsRUTConfirmed] = useState(false);
  const [rutError, setRUTError] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string | null>(null);
  const [clientSurname, setClientSurname] = useState<string | null>(null);
  
  const clients = useClientStore((state) => state.clients);
  const client = clients.find(client => client.rut === customerRUT);

  const validateRUT = (rut: string): boolean => {
    const rutPattern = /^\d{1,2}(?:\.\d{3}){2}-[0-9Kk]$/;
    return rutPattern.test(rut);
  };

  const confirmRUT = () => {
    if (validateRUT(customerRUT)) {
      setIsRUTConfirmed(true);
      setRUTError(null);
      if (client) {
        setClientName(client.name);
        setClientSurname(client.apellido);
      } else {
        setClientName(null);
        setClientSurname(null);
      }
    } else {
      setRUTError("Por favor, ingrese un RUT valido (Ej: 12.345.678-9).");
    }
  };

  const handlePaymentSelection = (method: string) => {
    setSelectedMethod(method);
  };

  const confirmPayment = () => {
    if (selectedMethod) {
      setIsPaymentConfirmed(true);
    }
  };

  const completePayment = (onSelectPaymentMethod: (method: string, rut: string) => void, onClose: () => void) => {
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
    setRUTError(null);
    setClientName(null);
    setClientSurname(null); 
  };

  const progressValue = isPaymentConfirmed ? 100 : isRUTConfirmed ? 66 : 0;

  return {
    selectedMethod,
    isPaymentConfirmed,
    customerRUT,
    isRUTConfirmed,
    rutError,
    clientName,
    clientSurname,
    progressValue,
    handlePaymentSelection,
    confirmRUT,
    confirmPayment,
    completePayment,
    resetPaymentState,
  };
};
