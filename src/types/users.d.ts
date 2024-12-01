import type  { roles } from "@/data/roles";

export type Role = typeof roles[number];

export interface CurrentUser {
  name: string;
  apellido: string;
  role: Role;
  access_token: string;
  id_usuario: number;
  rut: string;
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
  nombre_completo : string;
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

export interface LoginData {
  rut: string;
  contrasena: string;
}

export interface UserInfoResponse {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  rut: string;
  telefono: string;
  tipo_usuario: Role;
  puntos: number;
  fecha_creacion: string;
  estado: string;
}

export interface LoginResponse {
  access_token: string;
}