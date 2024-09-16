export interface Venta {
  numeroBoleta: number;
  monto: number;
  fecha: Date;
  boleta: string;
}

export const ventas: Venta[] = [
  {
    numeroBoleta: 1,
    monto: 5000,
    fecha: new Date("2024-09-10"),
    boleta: "BOLETA-001",
  },
  {
    numeroBoleta: 2,
    monto: 3200,
    fecha: new Date("2024-09-11"),
    boleta: "BOLETA-002",
  },
  {
    numeroBoleta: 3,
    monto: 4500,
    fecha: new Date("2024-09-12"),
    boleta: "BOLETA-003",
  },
];
