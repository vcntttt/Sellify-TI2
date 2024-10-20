import { addProduct, editProduct, getProducts } from '@/api/products';
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

const useProductMutation = (mutationFn: (product: Producto) => Promise<any>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productQueryKey],
      });
    },
  });
};

export const useAddProductMutation = () => {
  return useProductMutation((product: Producto) => addProduct(product));
};

export const useEditProductMutation = () => {
  return useProductMutation((product: Producto) => editProduct(product));
};