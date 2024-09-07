import AdminSection from "@/components/admin/Section";
import {  useEffect, useState } from "react";
import { products as productsData } from "@/data/products";
import { Productos as ProductType } from "@/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function fetchProducts(){
  return productsData;
}

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <AdminSection title="Productos">
      <DataTable columns={columns} data={products} />
    </AdminSection>
  );
}
