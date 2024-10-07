export type Role = "admin" | "cashier" | "customer" | "";

export interface User {
  id_usuario?: number;
  nombre:     string;
  apellido?:   string;
  correo?:     string;
  rut?:        string;
  telefono?:   string;
  role?: Role;
}