import { create } from "zustand";

interface Store {
  role : string;
  setRole : (role : string) => void;
}

const useStore = create<Store>((set) => ({
  role : "admin",
  setRole : (role : string) => set(() => ({ role }))
}));

export default useStore;
