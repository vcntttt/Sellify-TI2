import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCard } from "@/hooks/cajero/use-card";

interface CardFormProps {
  confirmPayment: (formData: any) => void;
  resetPaymentState: () => void;
}

export default function CardForm({ confirmPayment, resetPaymentState }: CardFormProps) {
  const { formData, errors, handleInputChange, validateForm } = useCard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Pago enviado:', formData);
      confirmPayment(formData);
    } else {
      console.log('Formulario con errores:', errors);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
  };

  const getCardLogo = () => {
    if (formData.cardType === 'credito') {
      return <img src="./Credito.svg" alt="Logo Crédito" className="h-11" />;
    } else if (formData.cardType === 'debito') {
      return <img src="./Debito.svg" alt="Logo Débito" className="h-11" />;
    } else {
      return <img src="./Card.svg" alt="Logo Débito" className="h-8" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2 relative">
        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
        <div className="absolute left-3 top-11 transform -translate-y-1/2 flex items-center">
          {getCardLogo()}
        </div>
        <Input
          id="cardNumber"
          name="cardNumber"
          placeholder="0000 0000 0000 0000"
          value={formatCardNumber(formData.cardNumber)}
          onChange={handleInputChange}
          maxLength={19}
          className={`pl-14 ${errors.cardNumber ? 'border-red-500' : ''}`} 
        />
        {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Fecha de Vencimiento</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              name="expiryMonth"
              placeholder="MM"
              value={formData.expiryMonth}
              onChange={handleInputChange}
              maxLength={2}
              className={errors.expiryDate ? 'border-red-500' : ''}
            />
            <Input
              name="expiryYear"
              placeholder="YY"
              value={formData.expiryYear}
              onChange={handleInputChange}
              maxLength={2}
              className={errors.expiryDate ? 'border-red-500' : ''}
            />
          </div>
          {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="securityCode">Código de Seguridad</Label>
          <Input
            id="securityCode"
            name="securityCode"
            placeholder="123"
            value={formData.securityCode}
            onChange={handleInputChange}
            maxLength={4}
            className={errors.securityCode ? 'border-red-500' : ''}
          />
          {errors.securityCode && <p className="text-red-500 text-sm">{errors.securityCode}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardholderName">Nombre del Titular</Label>
        <Input
          id="cardholderName"
          name="cardholderName"
          placeholder="Nombre Apellido"
          value={formData.cardholderName}
          onChange={handleInputChange}
          className={errors.cardholderName ? 'border-red-500' : ''}
        />
        {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName}</p>}
      </div>

      <div className="flex justify-between gap-4 mt-4">
        <Button
          type="button"
          onClick={resetPaymentState} 
          className="rounded-lg shadow-md transition duration-200 w-full sm:w-auto"
        >
          Volver
        </Button>
        <Button
          type="submit"
          className="rounded-lg shadow-md transition duration-200 w-full sm:w-auto"
        >
          Confirmar Pago
        </Button>
      </div>
    </form>
  );
}
