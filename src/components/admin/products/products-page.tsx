import AdminSection from "@/components/admin/section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useProducts } from "@/hooks/query/use-products";
import CardVentasMes from "../dashboard/ventas-mes";
import CardProductosVendidos from "../dashboard/productos-mes";

export default function Products() {
  const { data , isFetching} = useProducts();

  return (
    <AdminSection title="Productos">
      <div className="grid grid-row-2 size-full gap-4">
         <section className="grid grid-cols-2 gap-2 border-none h-full">
            <CardVentasMes />
            <CardProductosVendidos />
          </section>
        <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
      </div>
    </AdminSection>
  );
}
