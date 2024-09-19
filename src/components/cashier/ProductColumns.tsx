"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Product = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
    originalPrice: number; 
    discountedPrice?: number; 
    };
    

export const productColumns: ColumnDef<Product>[] = [
    {
    accessorKey: "id",
    header: "Código",
    },
    {
    accessorKey: "name",
    header: "Nombre",
    },
    {
    accessorKey: "quantity",
    header: "Cantidad",
    },
    {
    accessorKey: "price",
    header: "Precio Unitario",
    cell: ({ getValue }) => `$${getValue()}`,
    },
    {
    accessorKey: "totalPrice",
    header: "Precio Total",
    cell: ({ getValue }) => `$${getValue()}`,
    },
];
