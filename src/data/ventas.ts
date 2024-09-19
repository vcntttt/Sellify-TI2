import { Venta } from "@/types/ventas";

export const ventas: Venta[] = [
  {
    id: 1,
    formaPago: "efectivo",
    tipoRegistro: "boleta",
    total: 10000,
    fecha: new Date('2024-09-14'),
    detalleVentas: [
      { id: 1, id_producto: 101, cantidad: 2, subtotal: 5000 },
      { id: 2, id_producto: 102, cantidad: 1, subtotal: 5000 },
    ],
  },
  {
    id: 2,
    formaPago: "debito",
    tipoRegistro: "factura",
    total: 30000,
    fecha: new Date('2024-09-14'),
    detalleVentas: [
      { id: 3, id_producto: 103, cantidad: 3, subtotal: 15000 },
      { id: 4, id_producto: 104, cantidad: 2, subtotal: 15000 },
    ],
  },
  {
    id: 3,
    formaPago: "credito",
    tipoRegistro: "boleta",
    total: 20000,
    fecha: new Date('2024-09-13'),
    detalleVentas: [
      { id: 5, id_producto: 105, cantidad: 4, subtotal: 8000 },
      { id: 6, id_producto: 106, cantidad: 3, subtotal: 12000 },
    ],
  },
  {
    id: 4,
    formaPago: "efectivo",
    tipoRegistro: "factura",
    total: 45000,
    fecha: new Date('2024-09-12'),
    detalleVentas: [
      { id: 7, id_producto: 107, cantidad: 5, subtotal: 22500 },
      { id: 8, id_producto: 108, cantidad: 3, subtotal: 22500 },
    ],
  },
  {
    id: 5,
    formaPago: "debito",
    tipoRegistro: "boleta",
    total: 12000,
    fecha: new Date('2024-09-11'),
    detalleVentas: [
      { id: 9, id_producto: 109, cantidad: 2, subtotal: 6000 },
      { id: 10, id_producto: 110, cantidad: 1, subtotal: 6000 },
    ],
  },
  {
    id: 6,
    formaPago: "credito",
    tipoRegistro: "factura",
    total: 7500,
    fecha: new Date('2024-09-10'),
    detalleVentas: [
      { id: 11, id_producto: 111, cantidad: 1, subtotal: 3500 },
      { id: 12, id_producto: 112, cantidad: 2, subtotal: 4000 },
    ],
  },
  {
    id: 7,
    formaPago: "efectivo",
    tipoRegistro: "boleta",
    total: 22000,
    fecha: new Date('2024-09-09'),
    detalleVentas: [
      { id: 13, id_producto: 113, cantidad: 3, subtotal: 11000 },
      { id: 14, id_producto: 114, cantidad: 3, subtotal: 11000 },
    ],
  },
  {
    id: 8,
    formaPago: "debito",
    tipoRegistro: "factura",
    total: 34000,
    fecha: new Date('2024-09-08'),
    detalleVentas: [
      { id: 15, id_producto: 115, cantidad: 4, subtotal: 17000 },
      { id: 16, id_producto: 116, cantidad: 2, subtotal: 17000 },
    ],
  },
  {
    id: 9,
    formaPago: "credito",
    tipoRegistro: "boleta",
    total: 9500,
    fecha: new Date('2024-09-07'),
    detalleVentas: [
      { id: 17, id_producto: 117, cantidad: 2, subtotal: 5000 },
      { id: 18, id_producto: 118, cantidad: 1, subtotal: 4500 },
    ],
  },
  {
    id: 10,
    formaPago: "efectivo",
    tipoRegistro: "factura",
    total: 16000,
    fecha: new Date('2024-09-06'),
    detalleVentas: [
      { id: 19, id_producto: 119, cantidad: 3, subtotal: 9000 },
      { id: 20, id_producto: 120, cantidad: 2, subtotal: 7000 },
    ],
  },
];