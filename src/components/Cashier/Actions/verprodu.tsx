import React from 'react';

interface VerProductosButtonProps {
  onViewProducts: () => void;
}

const VerProductosButton: React.FC<VerProductosButtonProps> = ({ onViewProducts }) => {
  return (
    <button
      onClick={onViewProducts}
      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full"
    >
      Ver Productos
    </button>
  );
};

export default VerProductosButton;
