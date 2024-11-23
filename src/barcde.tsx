import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const BarcodeDisplayPage = () => {
  const [barcode, setBarcode] = useState(null);
  const [status, setStatus] = useState('Desconectado');
  const RUT = '217997607';

  useEffect(() => {
    const socket = io('/api');

    console.log('Intentando conectar al servidor WebSocket...');

    // Maneja la conexión
    socket.on('connect', () => {
      setStatus('Conectado');
      console.log('Conectado al servidor WebSocket');
    });

    socket.on(`barcode_update_${RUT}`, (data) => {
      if (data && data.barcode) {
        setBarcode(data.barcode);
        console.log('Código de barras recibido:', data.barcode);
      }
    });

  }, []);

  return (
    <div>
      <h1>Código de Barras Escaneado</h1>
      <p>Estado de conexión: {status}</p>
      {barcode ? (
        <p>Código de barras: {barcode}</p>
      ) : (
        <p>Esperando escaneo de código de barras...</p>
      )}
    </div>
  );
};

export default BarcodeDisplayPage;