// src/store/useAuthStore.ts
import create from 'zustand';

interface User {
  role: string;
  name: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}

const useStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;
