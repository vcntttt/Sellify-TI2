import AdminSection from "@/components/admin/Section";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useProduct } from "@/hooks/products/useProducts";

export default function Products() {
  const { products } = useProduct();

  return (
    <AdminSection title="Productos">
      <DataTable columns={columns} data={products} />
    </AdminSection>
  );
}
