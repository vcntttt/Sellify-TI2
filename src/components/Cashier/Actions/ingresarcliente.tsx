import React from 'react';

interface IngresarClienteButtonProps {
  onAddCustomer: () => void;
}

const IngresarClienteButton: React.FC<IngresarClienteButtonProps> = ({ onAddCustomer }) => {
  return (
    <button
      onClick={onAddCustomer}
      className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 w-full"
    >
      Ingresar Cliente
    </button>
  );
};

export default IngresarClienteButton;
