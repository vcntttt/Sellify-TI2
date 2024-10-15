import AdminSection from "@/components/admin/section-template";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useProductStore } from "@/store/products";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from '@/api/products';

export default function Products() {
  const products = useProductStore((state) => state.products)
  const { data } = useQuery({
    queryKey: ["users:clients"],
    queryFn: getProducts,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <AdminSection title="Productos">
      <DataTable columns={columns} data={data ?? []} />
    </AdminSection>
  );
}
