import React from 'react';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full ring-2 ring-gray-300">
        <h3 className="text-lg font-semibold mb-4">Aviso</h3>
        <p className="text-base mb-6">{message}</p>
        <button 
          onClick={onClose} 
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Alert;
