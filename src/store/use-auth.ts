import { create } from 'zustand';
import { User } from "@/types/users";

// Definir la interfaz del estado de la tienda
interface Store {
  user: User; 
  setUser: (user: User) => void;
}

// Crear el estado global con Zustand
export const useAuthStore = create<Store>((set) => ({
  user: {
    id: 1,
    name: 'Nelsiño',
    role: 'admin',
  },

  setUser: (user: User) =>
    set((state) => ({
      ...state, 
      user,
    })),

}));