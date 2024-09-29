import AdminSection from "../section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useFetch } from "@/hooks/use-fetch";

export default function UsersPage() {
  const { data, isLoading } = useFetch("/users");

  return (
    <AdminSection title="Usuarios">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900">
          </div>
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </AdminSection>
  );
}
