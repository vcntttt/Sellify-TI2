import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const BarcodeScannerWeb = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [receivedBarcode, setReceivedBarcode] = useState('');
  const RUT = "217997607";

  useEffect(() => {
    const socketRef = io('http://170.239.85.88:5000');

    // Manejar la conexión
    socketRef.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
      setIsConnected(true);
    });

    // Escuchar el evento 'barcode_scanned'
    socketRef.on(`barcode_update_${RUT}`, (data) => {
      console.log('Código de barras recibido:', data);
      setReceivedBarcode(data.barcode); // Actualiza el estado con el código recibido
    });

    // Manejar errores de conexión
    socketRef.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
    });

    // Limpieza al desmontar el componente
    return () => {
      if (socketRef) {
        socketRef.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h1>Escáner de Códigos de Barras</h1>
      <p>Estado de la conexión: {isConnected ? 'Conectado' : 'Desconectado'}</p>
      {receivedBarcode ? (
        <p><strong>Código de barras recibido:</strong> {receivedBarcode}</p>
      ) : (
        <p>No se ha recibido ningún código de barras.</p>
      )}
    </div>
  );
};

export default BarcodeScannerWeb;