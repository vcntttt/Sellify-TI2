import AdminSection from "../section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useVentasStore } from "@/store/ventas";
import CardVentasMes from "./ventas-mes";
import CardVentasSemana from "./ventas-semana";
import CardProductosVendidos from "../dashboard/productos-mes";

export default function DemoPage() {
  const { ventas } = useVentasStore();

  return (
    <AdminSection title="Ventas">
      <div className="grid grid-row-3 size-full gap-4">
         <section className="grid grid-cols-3 gap-2 border-none h-full">
            <CardVentasMes />
            <CardVentasSemana />
            <CardProductosVendidos />
          </section>
      <DataTable columns={columns} data={ventas}/>
      </div>
    </AdminSection>
  );
}
