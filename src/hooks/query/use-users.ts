import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, registerUser } from "@/api/users";

export const useUsers = () => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 , // Durante 1 hora mantiene la información por si se vuelve a lanzar esta peticion en otro lado
  });

  return { isFetching, data, error, refetch };
}

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  const userMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    }
  });

  return userMutation;
}