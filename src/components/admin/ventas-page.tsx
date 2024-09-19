import AdminSection from "@/components/admin/section-template";
import { useVentasStore } from "@/hooks/use-ventas";

export default function Ventas() {
  const {ventas} = useVentasStore();
  return (
    <AdminSection title="Ventas">
      <h1>Contenido</h1>
    </AdminSection>
  );
}
