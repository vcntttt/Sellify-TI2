import React, { useState } from 'react';
import { useLocation } from 'wouter';
import LoginForm from '../login/LoginForm';
import Alert from '../alerta/alert';
import useStore from '@/store/useAuthStore'; // Importa el store

const AdminLogin: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { setUser } = useStore(); // Función para setear el usuario
  const [, navigate] = useLocation(); // Hook para redireccionar

  const handleLogin = (username: string, password: string) => {
    if (username === 'cajero') {
      setAlertMessage("No es un usuario permitido.");
      setShowAlert(true);
    } else if (username === 'administrador' && password === '1') {
      // Autenticación correcta
      setUser({ role: 'admin', name: username }); // Actualiza el usuario en el store
      navigate('/dashboard'); // Redirecciona al panel de administración
    } else {
      setAlertMessage("Nombre de usuario o contraseña incorrectos.");
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6">Login Administrador</h1>
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

export default AdminLogin;
