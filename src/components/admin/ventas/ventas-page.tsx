import AdminSection from "../section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ventas } from "@/data/ventas";

export default function DemoPage() {

    return (
        <AdminSection title="Ventas">
          <DataTable columns={columns} data={ventas} />
        </AdminSection>
      );
}
