import { getRegistros } from "@/api/registros";
import { useQuery } from "@tanstack/react-query";

export const useRegistros = () => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["registros"],
    queryFn: getRegistros,
    staleTime: 1000 * 60,
  });

  return { isFetching, data, error, refetch };
}