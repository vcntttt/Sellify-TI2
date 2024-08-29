// src/components/Auth/CajeroLogin.tsx
import React, { useState } from 'react';
import LoginForm from '../login/LoginForm';
import Alert from '../alerta/alert';
import CajeroPanel from '../cashier/PanelCajero';

const CajeroLogin: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username === 'administrador') {
      setAlertMessage("Un cajero no puede ingresar como administrador.");
      setShowAlert(true);
    } else if (username === 'cajero' && password === '2') {
      console.log('Cajero autenticado');
      setIsAuthenticated(true); 
    } else {
      setAlertMessage("Nombre de usuario o contraseña incorrectos.");
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (isAuthenticated) {
    return <CajeroPanel />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6">Login Cajero</h1>
        <LoginForm onSubmit={handleLogin} />
        {showAlert && (
          <Alert 
            message={alertMessage} 
            onClose={handleCloseAlert} 
          />
        )}
      </div>
    </div>
  );
};

export default CajeroLogin;
