import { create } from "zustand";
import { CurrentUser } from "@/types/users";
import { devtools, persist } from "zustand/middleware";

interface Store {
  user: CurrentUser;
  setUser: (user: CurrentUser) => void;
  logOut: () => void;
}

export const useAuthStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: {
          name: "",
          role: "",
          access_token: "",
          id_usuario: 0,
          rut: "",
          apellido: "",
        },
        setUser: (user: CurrentUser) => set({ user }, false, "setUser"),
        logOut: () => {
          set({ user: { name: "", role: "", access_token: "" , id_usuario: 0, rut: "", apellido: "" } }, false, "logOut")
        },
      }),
      {
        name: "auth-store",
      }
    )
  )
);