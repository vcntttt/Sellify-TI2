import AdminSection from "@/components/admin/section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useUsers } from "@/hooks/query/use-users";

export default function UsersPage() {
  const { isFetching, data, error } = useUsers()

  return (
    <AdminSection title="Usuarios">
      {error && <div className="text-red-500">{error.message}</div>}

      <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
    </AdminSection>
  );
}
