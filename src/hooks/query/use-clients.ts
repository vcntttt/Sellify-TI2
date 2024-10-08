import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/api/users";

export const useClients = () => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["users:clients"],
    queryFn: getClients,
    staleTime: 1000, // Durante 1 minuto mantiene la información por si se vuelve a lanzar esta peticion en otro lado
  });

  return { isFetching, data, error, refetch };
}