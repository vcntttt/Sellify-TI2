import { useState } from "react";
import { products as productList } from "@/data/products";

export function useCarrito() {
    const [addedProducts, setAddedProducts] = useState<any[]>([]);
    const [code, setCode] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [isOpenBoleta, setIsOpenBoleta] = useState(false);

    const handleAddProduct = () => {
        const foundProduct = productList.find((product) => product.id === code);
        if (foundProduct) {
        const currentDate = new Date();
        const discountDueDate = foundProduct.discount?.dueDate ?? undefined;
        const discountValue = foundProduct.discount?.value ?? 0;
        const isDiscountValid = discountDueDate 
        ? currentDate <= discountDueDate
        : false;

        const price = isDiscountValid
            ? foundProduct.price * (1 - discountValue / 100)
            : foundProduct.price; 

        setAddedProducts((prev) => {
            const existingProductIndex = prev.findIndex(
            (product) => product.id === code
            );

            if (existingProductIndex >= 0) {
            const updatedProducts = [...prev];
            const existingProduct = updatedProducts[existingProductIndex];

            const updatedQuantity = existingProduct.quantity + quantity;
            updatedProducts[existingProductIndex] = {
                ...existingProduct,
                quantity: updatedQuantity,
                totalPrice: price * updatedQuantity,
            };

            return updatedProducts;
            } else {
            const newProduct = {
                ...foundProduct,
                quantity,
                price,
                totalPrice: price * quantity,
            };
            return [...prev, newProduct];
            }
        });

        setTotal((prev) => prev + price * quantity);
        setCode(null);
        setQuantity(1);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
        handleAddProduct();
        }
    };

    const endSale = () => {
        setIsOpenBoleta(false);
        setAddedProducts([]);
        setCode(null);
        setQuantity(1);
        setTotal(0);
      };

    return {     
        addedProducts,
        code,
        quantity,
        total,
        isOpenBoleta,
        setCode,
        setQuantity,
        handleAddProduct,
        handleKeyPress,
        setIsOpenBoleta,
        endSale};
};

export default useCarrito;