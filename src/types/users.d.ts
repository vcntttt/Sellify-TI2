export type Role = "admin" | "cashier" | "customer" | "";

export interface User {
  id_usuario: number;
  apellido:   string;
  correo:     string;
  rut:        string;
  phone:   string;
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
