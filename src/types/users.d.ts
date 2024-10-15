import type  { roles } from "@/data/roles";

export type Role = typeof roles[number];

export interface CurrentUser {
  name: string;
  role: Role;
}

export interface UserResponse {
  apellido:     string;
  correo:       string;
  id_usuario:   number;
  nombre:       string;
  puntos:       number;
  rut:          string;
  telefono:     string;
  tipo_usuario:  Role;
}

export interface NewUserBody {
  rut:          string;
  nombre:       string;
  apellido:     string;
  correo:       string;
  contrasena:   string;
  telefono:     string;
  tipo_usuario: Role;
}