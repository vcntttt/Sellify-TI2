import AdminSection from "@/components/admin/section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useUsers } from "@/hooks/query/use-users";
import ClientPoints from "./MasPuntos";

export default function UsersPage() {
  const { isFetching, data, error } = useUsers();

  return (
    <AdminSection title="Usuarios">
      {error && <div className="text-red-500">{error.message}</div>}
      <h2 className="text-xl font-bold mb-4">Clientes Destacados</h2>
      <div className="flex space-x-4 mb-8">
        <ClientPoints />
      </div>
      <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
    </AdminSection>
  );
}
