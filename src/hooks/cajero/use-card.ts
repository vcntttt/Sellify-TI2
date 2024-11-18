import { useState } from 'react';
import { MetodoPago } from '@/types/ventas'; 

interface CardFormData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  securityCode: string;
  cardholderName: string;
  cardType: MetodoPago;  
}

const luhnCheck = (cardNumber: string) => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const TypeCard = (cardNumber: string): MetodoPago => {
  const debitPrefixes = ['4', '5']; 
  const creditPrefixes = ['3', '6', '7'];

  const firstDigit = cardNumber.charAt(0);
  if (debitPrefixes.includes(firstDigit)) {
    return 'debito';
  } else if (creditPrefixes.includes(firstDigit)) {
    return 'credito'; 
  }
  return 'efectivo'; 
};

const Validacion = (cardNumber: string) => {
  const formattedCardNumber = cardNumber.replace(/\s+/g, ''); 
  return /^[0-9]{13,19}$/.test(formattedCardNumber) && luhnCheck(formattedCardNumber);
};

const ExpFecha = (expiryMonth: string, expiryYear: string) => {
  const currentDate = new Date();
  const expiryDate = new Date(`20${expiryYear}-${expiryMonth}-01`);
  return expiryDate > currentDate;
};

const CodeSeguridad = (securityCode: string) => {
  return /^[0-9]{3,4}$/.test(securityCode);
};

const ValiName = (name: string) => {
  return name.trim().length > 0;
};

export function useCard() {
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    securityCode: '',
    cardholderName: '',
    cardType: 'efectivo', 
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
    cardholderName: '',
    cardType: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'cardNumber') {
      const detectedType = TypeCard(value);
      setFormData((prev) => ({
        ...prev,
        cardType: detectedType,
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {
      cardNumber: '',
      expiryDate: '',
      securityCode: '',
      cardholderName: '',
      cardType: '',
    };

    if (!Validacion(formData.cardNumber)) {
      formErrors.cardNumber = 'Número de tarjeta inválido';
    }

    if (!ExpFecha(formData.expiryMonth, formData.expiryYear)) {
      formErrors.expiryDate = 'Fecha de vencimiento inválida';
    }

    if (!CodeSeguridad(formData.securityCode)) {
      formErrors.securityCode = 'Código de seguridad inválido';
    }

    if (!ValiName(formData.cardholderName)) {
      formErrors.cardholderName = 'Nombre del titular inválido';
    }

    if (formData.cardType === 'efectivo') {
      formErrors.cardType = 'Tipo de tarjeta desconocido';
    }

    setErrors(formErrors);

    return Object.values(formErrors).every((error) => error === '');
  };

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
  };
}
