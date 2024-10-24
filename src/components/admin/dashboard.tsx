export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-semibold pb-2">Panel de Administración</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-2 h-full w-full *:border-slate-700/20 *:border-[1px] *:p-4 *:rounded-md">
        <div className="lg:col-span-2"></div>
        <div className="lg:row-span-3"></div>
        <div className="lg:col-span-2"></div>
        <div className="lg:col-span-2"></div>
      </div>
    </>
  );
}
