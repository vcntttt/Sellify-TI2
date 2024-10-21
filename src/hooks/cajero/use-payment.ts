import { useState } from "react";
import { useClients } from "@/hooks/query/use-clients";
import { addPoints, updateUserPoints } from "@/api/Client";

export const usePayment = (totalCost: number) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [customerRUT, setCustomerRUT] = useState<string>("");
  const [isRUTConfirmed, setIsRUTConfirmed] = useState(false);
  const [clientName, setClientName] = useState<string | null>(null);
  const [clientSurname, setClientSurname] = useState<string | null>(null);
  const [skipRegistration, setSkipRegistration] = useState(false);
  const [sufficientPoints, setSufficientPoints] = useState<boolean>(false);
  const { data: clients } = useClients();

  const client = clients?.find((client) => client.rut === customerRUT);

  const handlePaymentSelection = (method: string) => {
    setSelectedMethod(method);
  };

  const confirmRUT = () => {
    setIsRUTConfirmed(true);
    if (client) {
      setClientName(client.nombre);
      setClientSurname(client.apellido);
      setSufficientPoints(client.puntos >= totalCost);
    } else {
      setClientName(null);
      setClientSurname(null);
      setSufficientPoints(false);
    }
  };

  const confirmPayment = async () => {
    if (selectedMethod && client) {
      setIsPaymentConfirmed(true);
      try {
        if (selectedMethod === "Puntos") {
          const remainingPoints = client.puntos - totalCost; 
          await updateUserPoints(customerRUT, remainingPoints);
        } else {
          const pointsToAdd = 500; 
          const newPoints = client.puntos + pointsToAdd;
          await updateUserPoints(customerRUT, newPoints);
        }
      } catch (error) {
        console.error("Error actualizando los puntos:", error);
      }
    } else if (selectedMethod && !client) {
      await addPoints(customerRUT, 10);
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
    setClientName(null);
    setClientSurname(null);
    setSkipRegistration(false);
  };

  return {
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
  };
};
