import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react";

type Status = 'Success' | 'Error' | 'Info' | '';

export default function RegisterActions({ tableRef }: { tableRef: any }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    if (status === null) {
      tableRef.getColumn("type")?.setFilterValue(undefined);
    } else {
      tableRef.getColumn("type")?.setFilterValue(status);
    }
  }, [status, tableRef]);

  return (
    <div className="flex gap-4">
      <Select onValueChange={(value) => setStatus(value === "todos" ? null : (value as Status))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Success">Success</SelectItem>
          <SelectItem value="Error">Error</SelectItem>
          <SelectItem value="Info">Info</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}