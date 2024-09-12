import {  useEffect, useState } from "react";
import { products as productsData } from "@/data/products";
import { Productos as ProductType } from "@/types";

export function useProduct(){
    const [products, setProducts] = useState<ProductType[]>([]);

    async function fetchProducts(){
        return productsData;
      }

    useEffect(() => {
        fetchProducts().then((data) => {
          setProducts(data);
        });
      }, []);
    
    return {products};
}