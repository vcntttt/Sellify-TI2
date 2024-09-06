// src/components/Actions/CashierActions.tsx
import React from 'react';
import ConfirmarCompraButton from './confirmar';
import RechazarCompraButton from './rechazar';
import VerProductosButton from './verprodu';
import IngresarClienteButton from './ingresarcliente';

interface CajeroActionsProps {
  onConfirmar: () => void;
  onRechazar: () => void;
  onVerProductos: () => void;
  onIngresarCliente: () => void;
}

const CajeroActions: React.FC<CajeroActionsProps> = ({
  onConfirmar,
  onRechazar,
  onVerProductos,
  onIngresarCliente
}) => {
  return (
    <div className="space-y-3">
      <ConfirmarCompraButton onConfirm={onConfirmar} />
      <RechazarCompraButton onReject={onRechazar} />
      <VerProductosButton onViewProducts={onVerProductos} />
      <IngresarClienteButton onAddCustomer={onIngresarCliente} />
    </div>
  );
};

export default CajeroActions;
