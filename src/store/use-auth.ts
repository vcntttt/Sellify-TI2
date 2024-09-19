import { create } from 'zustand';
import { User } from "@/types/users";
import { devtools } from "zustand/middleware";

// Definir la interfaz del estado de la tienda
interface Store {
  user: User; 
  setUser: (user: User) => void;
}

// Crear el estado global con Zustand
export const useAuthStore = create<Store>()(devtools((set) => ({  
  user: {
    name: '',
    role: '',
  },
  setUser: (user: User) => set({ user }, false, "setUser"),
})));
