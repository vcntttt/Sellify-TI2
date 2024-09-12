import { Productos as ProductType } from "@/types";

export const products: ProductType[] = [
  {
    "id": 1,
    "name": "Manzana",
    "stock": 100,
    "price": 500,
    "category": "Frutas",
    "createdAt": new Date("2024-08-15"),
    "dueDate": new Date("2024-09-07"),
    "discount": 0
  },
  {
    "id": 2,
    "name": "Plátano",
    "stock": 150,
    "price": 300,
    "category": "Frutas",
    "createdAt": new Date("2024-08-20"),
    "dueDate": new Date("2024-10-10"),
    "discount": 5
  },
  {
    "id": 3,
    "name": "Naranja",
    "stock": 80,
    "price": 600,
    "category": "Frutas",
    "createdAt": new Date("2024-07-30"),
    "dueDate": new Date("2024-09-15"),
    "discount": 0
  },
  {
    "id": 4,
    "name": "Leche",
    "stock": 50,
    "price": 1200,
    "category": "Lácteos",
    "createdAt": new Date("2024-09-01"),
    "dueDate": new Date("2024-09-10"),
    "discount": 15
  },
  {
    "id": 5,
    "name": "Queso",
    "stock": 30,
    "price": 2500,
    "category": "Lácteos",
    "createdAt": new Date("2024-08-01"),
    "dueDate": new Date("2024-09-30"),
    "discount": 0
  },
  {
    "id": 6,
    "name": "Yogur",
    "stock": 40,
    "price": 1000,
    "category": "Lácteos",
    "createdAt": new Date("2024-08-25"),
    "dueDate": new Date("2024-09-05"),
    "discount": 20
  },
  {
    "id": 7,
    "name": "Pan",
    "stock": 70,
    "price": 1500,
    "category": "Panadería",
    "createdAt": new Date("2024-08-10"),
    "dueDate": new Date("2024-09-20"),
    "discount": 0
  },
  {
    "id": 8,
    "name": "Mantequilla",
    "stock": 20,
    "price": 2000,
    "category": "Panadería",
    "createdAt": new Date("2024-07-28"),
    "dueDate": new Date("2024-09-08"),
    "discount": 0
  },
  {
    "id": 9,
    "name": "Huevos",
    "stock": 60,
    "price": 200,
    "category": "Panadería",
    "createdAt": new Date("2024-07-20"),
    "dueDate": new Date("2024-09-25"),
    "discount": 0
  },
  {
    "id": 10,
    "name": "Pollo",
    "stock": 90,
    "price": 5000,
    "category": "Carnes",
    "createdAt": new Date("2024-08-02"),
    "dueDate": new Date("2024-09-18"),
    "discount": 0
  }
];


// export const products: ProductType[] = [
// {
//   "id": 1,
//   "name": "Manzana",
//   "stock": 100,
//   "price": {
//     "original": 500,
//     "discountedPrice": 500,  // Igual al original porque no hay descuento
//     "discount": 0
//   },
//   "category": "Frutas",
//   "createdAt": new Date("2024-08-15"),
//   "dueDate": new Date("2024-09-07"),
// },
// {
//   "id": 2,
//   "name": "Plátano",
//   "stock": 150,
//   "price": {
//     "original": 300,
//     "discountedPrice": 285,  // Precio con un 5% de descuento
//     "discount": 5
//   },
//   "category": "Frutas",
//   "createdAt": new Date("2024-08-20"),
//   "dueDate": new Date("2024-10-10"),
// },
// {
//   "id": 3,
//   "name": "Naranja",
//   "stock": 80,
//   "price": {
//     "original": 600,
//     "discountedPrice": 600,  // Igual al original porque no hay descuento
//     "discount": 0
//   },
//   "category": "Frutas",
//   "createdAt": new Date("2024-07-30"),
//   "dueDate": new Date("2024-09-15"),
// },
// {
//   "id": 4,
//   "name": "Leche",
//   "stock": 50,
//   "price": {
//     "original": 1200,
//     "discountedPrice": 1020,  // Precio con un 15% de descuento
//     "discount": 15
//   },
//   "category": "Lácteos",
//   "createdAt": new Date("2024-09-01"),
//   "dueDate": new Date("2024-09-10"),
// },
// {
//   "id": 5,
//   "name": "Queso",
//   "stock": 30,
//   "price": {
//     "original": 2500,
//     "discountedPrice": 2500,  // Igual al original porque no hay descuento
//     "discount": 0
//   },
//   "category": "Lácteos",
//   "createdAt": new Date("2024-08-01"),
//   "dueDate": new Date("2024-09-30"),
// },
// {
//   "id": 6,
//   "name": "Yogur",
//   "stock": 40,
//   "price": {
//     "original": 1000,
//     "discountedPrice": 800,  // Precio con un 20% de descuento
//     "discount": 20
//   },
//   "category": "Lácteos",
//   "createdAt": new Date("2024-08-25"),
//   "dueDate": new Date("2024-09-05"),
// },
// {
//   "id": 7,
//   "name": "Pan",
//   "stock": 70,
//   "price": {
//     "original": 1500,
//     "discountedPrice": 1500,  // Igual al original porque no hay descuento
//     "discount": 0
//   },
//   "category": "Panadería",
//   "createdAt": new Date("2024-08-10"),
//   "dueDate": new Date("2024-09-20"),
// },
// {
//   "id": 8,
//   "name": "Mantequilla",
//   "stock": 20,
//   "price": {
//     "original": 2000,
//     "discountedPrice": 2000,  // Igual al original porque no hay descuento
//     "discount": 0
//   },
//   "category": "Panadería",
//   "createdAt": new Date("2024-07-28"),
//   "dueDate": new Date("2024-09-08"),
// },
// {
//   "id": 9,
//   "name": "Huevos",
//   "stock": 60,
//   "price": {
//     "original": 200,
//     "discountedPrice": 200,  // Igual al original porque no hay descuento
//     "discount": 0
//   },
//   "category": "Panadería",
//   "createdAt": new Date("2024-07-20"),
//   "dueDate": new Date("2024-09-25"),
// },
// {
//   "id": 10,
//   "name": "Pollo",
//   "stock": 90,
//   "price": {
//     "original": 5000,
//     "discountedPrice": 5000,  // Igual al original porque no hay descuento
//     "discount": 0
//   },
//   "category": "Carnes",
//   "createdAt": new Date("2024-08-02"),
//   "dueDate": new Date("2024-09-18"),
// }
// ];