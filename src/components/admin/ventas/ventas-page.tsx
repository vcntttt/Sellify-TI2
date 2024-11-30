import AdminSection from "../section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CardVentasMes from "./ventas-mes";
import CardVentasSemana from "./ventas-semana";
import CardProductosVendidos from "../dashboard/productos-mes";
import { useVentas } from "@/hooks/query/use-ventas";

export default function VentasPage() {
  const { data, refetch } = useVentas();
  return (
    <AdminSection title="Ventas">
      <div className="grid grid-row-3 gap-4">
         <section className="grid grid-cols-3 gap-2 border-none">
            <CardVentasSemana />
            <CardVentasMes />
            <CardProductosVendidos />
          </section>
        <DataTable columns={columns} data={data ?? [] } refetchFn={refetch}/>
      </div>
    </AdminSection>
  );
}
