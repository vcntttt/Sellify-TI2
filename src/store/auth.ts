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

interface ClientStore {
  clients: Client[];
  addClient: (client: Client) => void;
  searchClients: (searchTerm: string) => Client[]; 
}
export const useClientStore = create<ClientStore>()(
  devtools((set, get) => ({
    clients: [],
    addClient: (client: Client) => set((state) => ({
      clients: [...state.clients, client],
    }), false, "addClient"),

    // Implementación del filtro de búsqueda
    searchClients: (searchTerm: string) => {
      const clients = get().clients;
      return clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.rut.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  }))
);