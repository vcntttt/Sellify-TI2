export interface Products {
  id: number;
  name: string;
  stock: number;
  price: number;
  category: "Frutas" | "Lácteos" | "Panadería" | "Carnes" | "Granos" | "Condimentos" | "Salsas";
}