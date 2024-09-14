import { Productos as ProductType } from "@/types";

export const products: ProductType[] = [
  {
    id: 1,
    name: "Manzana",
    stock: 100,
    price: 500,
    category: "Frutas",
    createdAt: new Date("2024-08-15"),
    dueDate: new Date("2024-09-07"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 2,
    name: "Plátano",
    stock: 150,
    price: 300,
    category: "Frutas",
    createdAt: new Date("2024-08-20"),
    dueDate: new Date("2024-10-10"),
    discount: {
      value: 5,
      dueDate: new Date("2024-09-16")
    }
  },
  {
    id: 3,
    name: "Naranja",
    stock: 80,
    price: 600,
    category: "Frutas",
    createdAt: new Date("2024-07-30"),
    dueDate: new Date("2024-09-15"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 4,
    name: "Leche",
    stock: 50,
    price: 1200,
    category: "Lácteos",
    createdAt: new Date("2024-09-01"),
    dueDate: new Date("2024-09-10"),
    discount: {
      value: 15,
      dueDate: new Date("2024-09-17")
    }
  },
  {
    id: 5,
    name: "Queso",
    stock: 30,
    price: 2500,
    category: "Lácteos",
    createdAt: new Date("2024-08-01"),
    dueDate: new Date("2024-09-30"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 6,
    name: "Yogur",
    stock: 40,
    price: 1000,
    category: "Lácteos",
    createdAt: new Date("2024-08-25"),
    dueDate: new Date("2024-09-05"),
    discount: {
      value: 20,
      dueDate: new Date("2024-09-16")
    }
  },
  {
    id: 7,
    name: "Pan",
    stock: 70,
    price: 1500,
    category: "Panadería",
    createdAt: new Date("2024-08-10"),
    dueDate: new Date("2024-09-20"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 8,
    name: "Mantequilla",
    stock: 20,
    price: 2000,
    category: "Panadería",
    createdAt: new Date("2024-07-28"),
    dueDate: new Date("2024-09-08"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 9,
    name: "Huevos",
    stock: 60,
    price: 200,
    category: "Panadería",
    createdAt: new Date("2024-07-20"),
    dueDate: new Date("2024-09-25"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 10,
    name: "Pollo",
    stock: 90,
    price: 5000,
    category: "Carnes",
    createdAt: new Date("2024-08-02"),
    dueDate: new Date("2024-09-18"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 11,
    name: "Tomate",
    stock: 120,
    price: 400,
    category: "Verduras",
    createdAt: new Date("2024-09-05"),
    dueDate: new Date("2024-09-20"),
    discount: {
      value: 10,
      dueDate: new Date("2024-09-16")
    }
  },
  {
    id: 12,
    name: "Zanahoria",
    stock: 130,
    price: 350,
    category: "Verduras",
    createdAt: new Date("2024-08-12"),
    dueDate: new Date("2024-09-25"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 13,
    name: "Pepino",
    stock: 90,
    price: 450,
    category: "Verduras",
    createdAt: new Date("2024-08-10"),
    dueDate: new Date("2024-09-18"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 14,
    name: "Papas",
    stock: 200,
    price: 600,
    category: "Tubérculos",
    createdAt: new Date("2024-07-25"),
    dueDate: new Date("2024-09-12"),
    discount: {
      value: 5,
      dueDate: new Date("2024-09-17")
    }
  },
  {
    id: 15,
    name: "Cebolla",
    stock: 160,
    price: 250,
    category: "Verduras",
    createdAt: new Date("2024-07-30"),
    dueDate: new Date("2024-09-14"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 16,
    name: "Ajo",
    stock: 180,
    price: 700,
    category: "Verduras",
    createdAt: new Date("2024-08-18"),
    dueDate: new Date("2024-09-22"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 17,
    name: "Arroz",
    stock: 300,
    price: 1500,
    category: "Granos",
    createdAt: new Date("2024-09-03"),
    dueDate: new Date("2024-10-01"),
    discount: {
      value: 10,
      dueDate: new Date("2024-09-16")
    }
  },
  {
    id: 18,
    name: "Fideos",
    stock: 250,
    price: 1300,
    category: "Granos",
    createdAt: new Date("2024-08-15"),
    dueDate: new Date("2024-09-29"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  },
  {
    id: 19,
    name: "Aceite",
    stock: 100,
    price: 3000,
    category: "Aceites",
    createdAt: new Date("2024-08-20"),
    dueDate: new Date("2024-10-05"),
    discount: {
      value: 15,
      dueDate: new Date("2024-09-17")
    }
  },
  {
    id: 20,
    name: "Harina",
    stock: 170,
    price: 1000,
    category: "Granos",
    createdAt: new Date("2024-07-31"),
    dueDate: new Date("2024-09-27"),
    discount: {
      value: 0,
      dueDate: null // No tiene fecha de vencimiento
    }
  }
];
