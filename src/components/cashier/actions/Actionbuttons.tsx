import React from 'react';
import ConfirmarCompraButton from './confirmar';
import RechazarCompraButton from './rechazar';
import VerProductosButton from './verprodu';
import IngresarClienteButton from './ingresarcliente';

interface ActionButtonsProps {
  onConfirm: () => void;
  onReject: () => void;
  onViewProducts: () => void;
  onAddCustomer: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onConfirm,
  onReject,
  onViewProducts,
  onAddCustomer,
}) => {
  return (
    <div className="space-y-3">
      <ConfirmarCompraButton onConfirm={onConfirm} />
      <RechazarCompraButton onReject={onReject} />
      <VerProductosButton onViewProducts={onViewProducts} />
      <IngresarClienteButton onAddCustomer={onAddCustomer} />
    </div>
  );
};

export default ActionButtons;
