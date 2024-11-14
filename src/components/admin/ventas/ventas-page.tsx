import AdminSection from "../section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useVentasStore } from "@/store/ventas";
import CardVentasMes from "../dashboard/ventas-mes";
import CardProductosVendidos from "../dashboard/productos-mes";

export default function DemoPage() {
  const { ventas } = useVentasStore();

  return (
    <AdminSection title="Ventas">
      <div className="grid grid-row-2 size-full gap-4">
         <section className="grid grid-cols-2 gap-2 border-none h-full">
            <CardVentasMes />
            <CardProductosVendidos />
          </section>
      <DataTable columns={columns} data={ventas}/>
      </div>
    </AdminSection>
  );
}
