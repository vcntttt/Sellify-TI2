import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/users";

export const useUsers = () => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000, // Durante 1 minuto mantiene la información por si se vuelve a lanzar esta peticion en otro lado
  });

  return { isFetching, data, error, refetch };
}