import { Input } from "@/components/ui/input";
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
  const { data: clients } = useClients();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients?.filter(
    (client) =>
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.rut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-4">
      <Input
        type="text"
        placeholder="Buscar cliente por nombre o RUT"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead>RUT</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients?.map((client, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{client.nombre}</TableCell>
                <TableCell>{client.rut}</TableCell>
                <TableCell>{client.correo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {searchTerm && filteredClients?.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          No se encontraron clientes con ese nombre o RUT.
        </div>
      )}
    </div>
  );
}
