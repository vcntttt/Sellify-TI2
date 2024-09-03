import React from 'react';

interface RechazarCompraButtonProps {
  onReject: () => void;
}

const RechazarCompraButton: React.FC<RechazarCompraButtonProps> = ({ onReject }) => {
  return (
    <button
      onClick={onReject}
      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
    >
      Rechazar Compra
    </button>
  );
};

export default RechazarCompraButton;
