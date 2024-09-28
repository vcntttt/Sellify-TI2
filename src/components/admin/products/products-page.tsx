import AdminSection from "@/components/admin/section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useProductStore } from "@/store/products";
import { useEffect } from "react";

export default function Products() {
  const products = useProductStore((state) => state.products)

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <AdminSection title="Productos">
      <DataTable columns={columns} data={products} />
    </AdminSection>
  );
}
