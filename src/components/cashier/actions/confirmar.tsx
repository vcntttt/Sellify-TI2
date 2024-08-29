import React from 'react';

interface ConfirmarCompraButtonProps {
  onConfirm: () => void;
}

const ConfirmarCompraButton: React.FC<ConfirmarCompraButtonProps> = ({ onConfirm }) => {
  return (
    <button
      onClick={onConfirm}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
    >
      Confirmar Compra
    </button>
  );
};

export default ConfirmarCompraButton;
