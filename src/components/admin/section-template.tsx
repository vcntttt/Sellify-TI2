interface Props {
  title: string;
  children: React.ReactNode;
  border?: boolean;
}

export default function AdminSection({ title, children, border = true }: Props) {

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div className= {border ? "border-slate-700/20 p-4 border-[1px] h-full rounded-lg" : "h-full"}>
        {children}
      </div>
    </>
  );
}
