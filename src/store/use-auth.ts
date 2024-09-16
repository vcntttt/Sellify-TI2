import { create } from 'zustand';


type UserRole = 'admin' | 'cashier' | 'customer';

// Definir la interfaz para el usuario
interface User {
  name: string; 
  role: UserRole; 
}

// Definir la interfaz del estado de la tienda
interface Store {
  user: User; 
  setUser: (user: User) => void;
}

// Crear el estado global con Zustand
export const useAuthStore = create<Store>((set) => ({
  user: {
    name: 'Jhon Doe',
    role: 'admin',
  },

  setUser: (user: User) =>
    set((state) => ({
      ...state, 
      user,
    })),

}));