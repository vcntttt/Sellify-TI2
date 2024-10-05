import { create } from "zustand";
import { User,Client } from "@/types/users";
import { devtools, persist } from "zustand/middleware";

interface Store {
  user: User;
  setUser: (user: User) => void;
  resetUser: () => void; 
}

export const useAuthStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: {
          name: "",
          role: "",
        },
        setUser: (newUser: User) => set((state) => {
          // Solo actualiza el estado si el nuevo usuario tiene un rol diferente
          if (!state.user.role || state.user.role !== newUser.role) {
            return { user: newUser };
          }
          return state; // Si el rol es el mismo, no lo actualiza
        }, false, "setUser"),
        resetUser: () => set({ user: { name: "", role: "" } }, false, "resetUser"), // Método para restablecer el usuario
      }),
      {
        name: "auth-store",
      }
    )
  )
);

// Tienda de clientes
interface ClientStore {
  clients: Client[];
  addClient: (client: Client) => void;
}

export const useClientStore = create<ClientStore>()(
  devtools((set) => ({
    clients: [],
    addClient: (client: Client) => set((state) => ({
      clients: [...state.clients, client],
    }), false, "addClient"),
  }))
);