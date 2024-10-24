interface Props {
  title: string;
  children: React.ReactNode;
  border?: boolean;
}

export default function AdminSection({
  title,
  children,
}: Props) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div
        className="h-full"
      >
        {children}
      </div>
    </>
  );
}
