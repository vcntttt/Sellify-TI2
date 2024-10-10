import { SortDirection } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowDownUpIcon } from "lucide-react";

export const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {

  if (isSorted === "asc") {
    return <ArrowUp className="ml-1 h-4 w-4" />;
  }
  if (isSorted === "desc") {
    return <ArrowDown className="ml-1 h-4 w-4" />;
  }
  else {
    return <ArrowDownUpIcon className="ml-1 h-4 w-4" />;
  }
};