import { SortDirection } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

export const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
  if (isSorted === "asc") {
    return <ArrowUp className="h-4 w-4" />;
  }
  if (isSorted === "desc") {
    return <ArrowDown className="h-4 w-4" />;
  }

  return null;
};