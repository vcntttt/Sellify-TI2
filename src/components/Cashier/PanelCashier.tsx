import React, { useState } from 'react';
import CajeroLayout from '../layouts/CashierLayout';
import Dialog from '../ui/dialog'; 
import { Button } from '../ui/button'; 

const CajeroPanel: React.FC = () => {
  const [dialogType, setDialogType] = useState<'productos' | 'boleta' | null>(null);
  const total = 123.45;
  const cajeroNombre = "Juan Pérez";

  // Funciones de manejo
  const manejarConfirmar = () => setDialogType('boleta');
  const manejarRechazar = () => setDialogType(null);
  const manejarVerProductos = () => setDialogType('productos');
  const manejarIngresarCliente = () => console.log('Ingresar cliente');
  const manejarCerrarDialogo = () => setDialogType(null);
  const manejarSalirPanel = () => console.log('Salir del panel');

  return (
    <>
      <CajeroLayout
        cajeroNombre={cajeroNombre}
        total={total}
        onVerProductos={manejarVerProductos}
        onIngresarCliente={manejarIngresarCliente}
        onSalirPanel={manejarSalirPanel}
        onConfirmar={manejarConfirmar}
        onRechazar={manejarRechazar}
      />

      {/* Diálogos */}
      <Dialog
        open={dialogType === 'productos'}
        onClose={manejarCerrarDialogo}
        title="Productos"
        className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200"
      >
        <p className="text-gray-700">Aquí se mostrarán los productos en el futuro.</p>
        <Button variant="secondary" onClick={manejarCerrarDialogo} className="mt-4 bg-gray-600 text-white hover:bg-gray-700">
          Cerrar
        </Button>
      </Dialog>

      <Dialog
        open={dialogType === 'boleta'}
        onClose={manejarCerrarDialogo}
        title="Boleta"
        className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200"
      >
        <p className="text-gray-700">Aquí está la boleta de la compra...</p>
        <Button variant="secondary" onClick={manejarCerrarDialogo} className="mt-4 bg-gray-600 text-white hover:bg-gray-700">
          Cerrar
        </Button>
      </Dialog>
    </>
  );
};

export default CajeroPanel;
