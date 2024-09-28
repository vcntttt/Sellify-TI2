import { create } from "zustand";
import { Category, Producto } from "@/types/products";
import { products as data } from "@/data/products";
import { categories } from "@/data/categories";

interface Store {
  products: Producto[];
  categories: Category[];
  setProducts: (products: Producto[]) => void;
  addProduct: (product: Producto) => void;
  editProduct: (productUpdated: Producto) => void;
  deleteProduct: (product: Producto) => void;
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
}

export const useProductStore = create<Store>((set) => ({
  products: data,
  categories: categories,
  setProducts: (products: Producto[]) => set({ products }),
  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  })),
  editProduct: (productUpdated) => set((state) => ({
    products: state.products.map((product) =>
      product.id === productUpdated.id ? { ...productUpdated } : product
    ),
  })),
  deleteProduct: (productToDelete) => set((state) => ({
    products: state.products.filter((product) => product.id !== productToDelete.id),
  })),
  setCategories: (categories: Category[]) => set({ categories }),
  addCategory: (category) => set((state) => ({
    categories: [...state.categories, category],
  })),
}));