import AnaliticActions from "@/components/admin/analiticas/AnaliticActions";
import ProductActions from "@/components/admin/products/menu-action";
import VentasActions from "@/components/admin/ventas/VentasActions";

const actionsMap: Record<string, React.FC> = {
  "Productos": ProductActions,
  "Analíticas": AnaliticActions,
  "Ventas": VentasActions,
};

interface Props {
  title: string;
  children: React.ReactNode;
  border?: boolean;
}

export default function AdminSection({ title, children, border = true }: Props) {

  const ActionComponent = actionsMap[title] || null;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {ActionComponent && <ActionComponent />}
      </div>
      <div className= {border ? "border-slate-700/20 p-4 border-[1px] h-full rounded-lg" : "h-full"}>
        {children}
      </div>
    </>
  );
}
