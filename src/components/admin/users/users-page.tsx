import AdminSection from "@/components/admin/section-template";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getUsers } from "@/api/users";

export default function UsersPage() {
  const { isFetching, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000, // Durante 1 minuto mantiene la información por si se vuelve a lanzar esta peticion en otro lado
  });

  return (
    <AdminSection title="Usuarios">
      {error && <div className="text-red-500">{error.message}</div>}
      {/* <Button onClick={() => refetch()}>Refetch</Button> */}
      <DataTable columns={columns} data={data ?? []} isLoading={isFetching} />
    </AdminSection>
  );
}
