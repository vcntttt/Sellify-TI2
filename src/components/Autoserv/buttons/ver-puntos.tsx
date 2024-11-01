import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClients } from "@/hooks/query/use-clients";
import { useState } from "react";

export default function ClientSearch() {
  const { data: clients, isFetching } = useClients();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients?.filter(
    (client) => client.rut.toLowerCase() === searchTerm.toLowerCase()
  ) || [];

  return (
    <div className="py-4">
      {isFetching ? (
        <div className="flex items-center justify-center">
          <Skeleton className="h-6 w-full" />
        </div>
      ) : (
        <Input
          type="text"
          placeholder="Ingresa tu RUT completo para ver tus datos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      
      {filteredClients.length > 0 && (
        <div className="max-h-[390px] overflow-y-auto">
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nombre</TableHead>
                <TableHead>RUT</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Puntos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{client.nombre}</TableCell>
                  <TableCell>{client.rut}</TableCell>
                  <TableCell>{client.correo}</TableCell>
                  <TableCell>{client.puntos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {searchTerm && filteredClients.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          No se encontró un cliente con ese RUT.
        </div>
      )}
    </div>
  );
}
