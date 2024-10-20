import { addCategory, getCategories } from "@/api/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const categorieQueryKey = "categories";

export const useCategories = () => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: [categorieQueryKey],
    queryFn: getCategories,
    staleTime: 1000 * 60, 
  });

  return { isFetching, data, error, refetch };
}

export const useCategoryMutation = () => {
  const queryClient = useQueryClient();
  const categoryMutation = useMutation({
    mutationFn: (category: string) => addCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [categorieQueryKey],
      });
    }
  })

  return categoryMutation;
}