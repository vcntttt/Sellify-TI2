import AdminSection from "@/components/admin/Section";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useProducts } from "@/hooks/admin/products/useProducts";

export default function Products() {
  const {products} = useProducts();

  return (
    <AdminSection title="Productos">
      <DataTable columns={columns} data={products} />
    </AdminSection>
  );
}
