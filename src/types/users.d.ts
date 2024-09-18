export type Role = "admin" | "cashier" | "customer";

export interface User {
  id: number;
  name: string;
  role: Role;
}