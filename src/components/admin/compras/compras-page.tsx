import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function ComprasPage() {
  return (
    <div className="grid grid-row-3 gap-7 ">
      <h1 className="text-2xl font mb-4"> Compras</h1>
      <DataTable columns={columns} />
    </div>
  );
}