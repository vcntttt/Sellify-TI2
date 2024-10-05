export type Role = "admin" | "cashier" | "customer" | "";

export interface User {
  name: string;
  role: Role;
}

// Definición de la interfaz Client
export interface Client {
  rut: string;          
  name: string;        
  apellido: string;    
  email: string;       
  password: string; 
}
