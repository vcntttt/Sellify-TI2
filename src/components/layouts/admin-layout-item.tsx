import { Section } from "@/data/sections";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Link, useLocation } from "wouter";

interface Props {
  section: Section;
}

export default function AdminLayoutItem({ section }: Props) {
  const [location] = useLocation();
  const queryClient = useQueryClient();

  const prefetchData = async () => {
    if (section.prefetch?.key && section.prefetch?.fn) {
      queryClient.prefetchQuery({
        queryKey: section.prefetch.key,
        queryFn: section.prefetch.fn,
        staleTime: 1000 * 60,
      });
    } else return;
  };

  return (
    <Link
      key={section.name}
      href={section.href}
      onMouseEnter={prefetchData}
      className={clsx(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
        {
          "bg-slate-700 text-white": location === section.href,
          "text-white/50": location !== section.href,
        }
      )}
    >
      {section.icon}
      {section.name}
    </Link>
  );
}
