import { create } from "zustand";
import { CurrentUser } from "@/types/users";
import { devtools, persist } from "zustand/middleware";

interface Store {
  user: CurrentUser;
  setUser: (user: CurrentUser) => void;
}

export const useAuthStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: {
          name: "",
          role: "",
        },
        setUser: (user: CurrentUser) => set({ user }, false, "setUser"),
      }),
      {
        name: "auth-store",
      }
    )
  )
);

{/* Tienda de clientes
interface ClientStore {
  clients: CurrentUser[];
  addClient: (client: CurrentUser) => void;
}

export const useClientStore = create<ClientStore>()(
  devtools((set) => ({
    clients: [],
    addClient: (client: CurrentUser) => set((state) => ({
      clients: [...state.clients, client],
    }), false, "addClient"),
  }))
);*/}