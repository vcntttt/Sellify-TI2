import { create } from 'zustand';


type UserRole = 'admin' | 'cashier' | 'customer';

// Definir la interfaz para el usuario
interface User {
  name: string | null; 
  role: UserRole | null; 
  token?: string; 
}

// Definir la interfaz del estado de la tienda
interface Store {
  user: User | null;
  setRole: (role: UserRole) => void; 
  login: (name: string, role: UserRole, password: string) => boolean; 
  logout: () => void; // Función para cerrar sesión
}

// Nombres predeterminados para cada rol
const defaultUsers = {
  admin: { name: 'John Doe', role: 'admin' as UserRole },
  cashier: { name: 'Rulo Kilo', role: 'cashier' as UserRole },
  customer: { name: 'Jane Smith', role: 'customer' as UserRole },
};

// Crear el estado global con Zustand
const useAuthStore = create<Store>((set) => ({
  user: null, // Usuario inicialmente no autenticado

  // Función para cambiar el rol del usuario
  setRole: (role) =>
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    })),

  // Función de login que valida el usuario y el rol
  login: (name, role, password) => {
    if (name === defaultUsers[role]?.name && password === 'your-password') { 
      set({
        user: defaultUsers[role] || null,
      });
      return true; 
    }
    return false; 
  },

  // Función de logout que limpia el estado del usuario
  logout: () =>
    set({
      user: null,
    }),
}));

export default useAuthStore;
