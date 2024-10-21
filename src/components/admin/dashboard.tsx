import AdminSection from "@/components/admin/section-template";

export default function Dashboard() {
  return (
    <AdminSection title="Panel de Administración" border={false}>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full w-full *:border-slate-700/20 *:border-[1px] *:p-4 *:rounded-md">
        <div className="col-span-2"></div>
        <div className="row-span-3"></div>
        <div className="col-span-2"></div>
        <div className="col-span-2"></div>
      </div>
    </AdminSection>
  );
}
