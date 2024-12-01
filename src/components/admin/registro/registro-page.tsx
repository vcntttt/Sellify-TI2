import { DataTable } from "./data-table";
import { columns } from "./columns";
import AdminSection from "../section-template";
import { useRegistros } from "@/hooks/query/use-registros";

export default function TablaRegistro() {
  const { data: notifications, isFetching, refetch } = useRegistros();

  return (
    <AdminSection title="Registros">
      <DataTable columns={columns} data={notifications ?? []} isLoading={isFetching} refetchFn={refetch}/>
    </AdminSection>
  );
}
