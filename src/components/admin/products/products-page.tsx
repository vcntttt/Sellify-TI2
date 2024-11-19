import AdminSection from "@/components/admin/section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useProducts } from "@/hooks/query/use-products";
import { ExpirationProducts } from "./expiration-products";
import CardProductosVendidos from "../dashboard/productos-mes";

export default function Products() {
  const { data , isFetching} = useProducts();

  return (
    <AdminSection title="Productos">
      <div className="grid grid-row-3 size-full gap-4">
         <section className="grid grid-cols-3 gap-2 border-none h-full">
            <ExpirationProducts data={data ?? []}/>
            <div>
              acuerdate del grafiquito juanma
            </div>
            <CardProductosVendidos />
          </section>
          <section>
            
          </section>
          <section>
            <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
          </section>
      </div>
    </AdminSection>
  );
}
