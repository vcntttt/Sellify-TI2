import { ventas as data } from '@/data/ventas';
import { create } from 'zustand';
import { Venta } from "@/types/ventas";

interface Store {
  ventas: Venta[]; 
  setVentas: (ventas: Venta[]) => void;
}

export const useVentasStore = create<Store>((set) => ({
  ventas: data,
  setVentas: (ventas: Venta[]) => set({ ventas }),

}));