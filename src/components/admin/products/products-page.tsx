import AdminSection from "@/components/admin/section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useProducts } from "@/hooks/query/use-products";

export default function Products() {
  const { data , isFetching} = useProducts();

  return (
    <AdminSection title="Productos">
      <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
    </AdminSection>
  );
}
