import { create } from "zustand";
import { Producto } from "@/types";
import { products as data } from "@/data/products";

interface Store {
  products: Producto[];
  setProducts: (products: Producto[]) => void;
  editProduct: (productUpdated: Producto) => void;
}

export const useProductStore = create<Store>((set) => ({
  products: data,
  setProducts: (products: Producto[]) => set({ products }),
  editProduct: (productUpdated) => set((state) => ({
    products: state.products.map((product) =>
      product.id === productUpdated.id ? { ...productUpdated } : product
    ),
  })),
}));
