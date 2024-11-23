import AdminSection from "../section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CardVentasMes from "./ventas-mes";
import CardVentasSemana from "./ventas-semana";
import CardProductosVendidos from "../dashboard/productos-mes";
import { getAllSales } from "@/api/ventas";
import { useEffect, useState } from "react";
import { Venta } from "@/types/ventas";

export default function DemoPage() {
  const [data, setData] = useState<Venta[]>([]);

  useEffect(() => {
    async function fetchData() {
      const salesData = await getAllSales();
      setData(salesData); 
    }
    fetchData();
  }, []);

  return (
    <AdminSection title="Ventas">
      <div className="grid grid-row-3 size-full gap-4">
         <section className="grid grid-cols-3 gap-2 border-none h-full">
            <CardVentasMes />
            <CardVentasSemana />
            <CardProductosVendidos />
          </section>
        <DataTable columns={columns} data={data}/>
      </div>
    </AdminSection>
  );
}
