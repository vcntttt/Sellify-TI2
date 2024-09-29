import AdminSection from "../section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useFetch } from "@/hooks/use-fetch";

export default function UsersPage() {
  const { data } = useFetch("/users");

  return (
    <AdminSection title="Usuarios">
        <DataTable columns={columns} data={data}/>
    </AdminSection>
  );
}
