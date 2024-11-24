import { AddVenta, getAllSales } from "@/api/ventas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useVentas = () => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["ventas"],
    queryFn: getAllSales,
    staleTime: 1000 * 60 ,
  });

  return { isFetching, data, error, refetch };
}

export const useVentaMutation = () => {
  const queryClient = useQueryClient();

  const userMutation = useMutation({
    mutationFn: AddVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ventas"],
      });
    }
  });

  return userMutation;
}