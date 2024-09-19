export type Role = "admin" | "cashier" | "customer" | "";

export interface User {
  name: string;
  role: Role;
}