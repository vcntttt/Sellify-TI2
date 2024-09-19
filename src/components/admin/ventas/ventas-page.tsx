import AdminSection from "../section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useVentasStore } from "@/store/use-ventas";



export default function DemoPage() {

  const {ventas} = useVentasStore();
    return (
        <AdminSection title="Ventas">
          <DataTable columns={columns} data={ventas} />
        </AdminSection>
      );
}
