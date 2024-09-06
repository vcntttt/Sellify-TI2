import { create } from "zustand";

interface User {
  name: string;
  role: string;
}

interface Store {
  user: User;
}

const useStore = create<Store>(() => ({
  user: {
    name: "John Doe",
    role: "admin",
  },
}));

export default useStore;
