import { create } from "zustand";
import { User } from "@/types/users";
import { devtools, persist } from "zustand/middleware";

interface Store {
  user: User;
  setUser: (user: User) => void;
}

export const useAuthStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: {
          name: "",
          role: "",
        },
        setUser: (user: User) => set({ user }, false, "setUser"),
      }),
      {
        name: "auth-store",
      }
    )
  )
);
