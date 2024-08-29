import AnaliticActions from "@/components/admin/actions/AnaliticActions";
import ProductActions from "@/components/admin/actions/ProductActions";
import VentasActions from "@/components/admin/actions/VentasActions";

const actionsMap: Record<string, React.FC> = {
  "Productos": ProductActions,
  "Analíticas": AnaliticActions,
  "Ventas": VentasActions,
};

export default function AdminSection({ title, children }: any) {

  const ActionComponent = actionsMap[title] || null;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {ActionComponent && <ActionComponent />}
      </div>
      <div className="border-slate-700/20 p-4 border-[1px] h-full rounded-lg">
        {children}
      </div>
    </>
  );
}
