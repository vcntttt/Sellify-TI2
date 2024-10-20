import { addProduct, getProducts } from '@/api/products';
import { Producto } from '@/types/products';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const productQueryKey = "products";

export const useProducts = () => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: [productQueryKey],
    queryFn: getProducts,
    staleTime: 1000 * 60, 
  });

  return { isFetching, data, error, refetch };
}

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: (product: Producto) => addProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productQueryKey],
      });
    }
  })

  return addProductMutation;
}