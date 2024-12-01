export interface Registro {
  descripcion:  string;
  fecha_y_hora: string;
  id_registro:  number;
  mensaje:      string;
  tipo:         string;
  usuario:      string;
}

export interface SaveRegistro {
  mensaje:      string;
  fecha_y_hora: string;
  tipo:         string;
  descripcion?:  string;
  usuario:      string;
}
