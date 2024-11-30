import Chart from "@/components/admin/dashboard/chart";
import CardProductosVendidos from "./productos-mes";
import CardIngresos from "./ingresos-mes";
import Top5ProductsCard from "./top5-productos";
import CardVentasMes from "../ventas/ventas-mes";

export default function Dashboard() {
  return (
    <main className="h-[91vh]">
      <h1 className="text-2xl font-semibold pb-4">Panel de Administración</h1>
      <div className="grid grid-row-3 size-full gap-3 grid-rows-[200px_1fr_1fr]">
        <section className="grid grid-cols-3 gap-3 border-none h-full">
          <CardVentasMes dashboard={true}/>
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
