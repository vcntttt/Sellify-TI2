import Chart from "@/components/admin/dashboard/chart";
import CardProductosVendidos from "./dashboard/productos-mes";
import CardIngresos from "./dashboard/ingresos-mes";
import CardVentasMes from "./dashboard/ventas-mes";
import Top5ProductsCard from "./dashboard/top5-productos";
import TablaRegis from "./registro/tabla-registro" 

export default function Dashboard() {
  return (
    <main className="h-[91vh]">
      <h1 className="text-2xl font-semibold pb-4">Panel de Administración</h1>
      <div className="grid grid-row-3 size-full gap-3 grid-rows-[200px_1fr_1fr]">
        <section className="grid grid-cols-3 gap-3 border-none h-full">
          <CardVentasMes />
          <CardIngresos />
          <CardProductosVendidos />
        </section>
        <section>
          <Chart />
        </section>
        <section>
          <Top5ProductsCard />
        </section>
      </div>
    </main>
  );
}
