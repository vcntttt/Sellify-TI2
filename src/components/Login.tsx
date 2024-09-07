import { useState } from 'react';
import { useLocation } from 'wouter'; // Importar useLocation para manejar la redirección
import useAuthStore from '@/store/useAuthStore'; // Importar el estado global

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setLocation] = useLocation(); // Hook para cambiar la ubicación
    const login = useAuthStore((state) => state.login); // Obtener la función de login

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar el login
        const success = login(username, 'admin', password);

        // Comprobar si el login fue exitoso y redirigir
        if (success) {
            setLocation('/dashboard'); // Redirigir al dashboard si el rol es admin
        } else {
            alert('Invalid username or password'); // Mostrar un mensaje si la autenticación falla
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-96 h-96 max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Usuario</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
                Ingresar
            </button>
        </form>
    );
}
