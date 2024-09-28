import { useState } from "react";
import { useProductStore } from "@/store/use-products";

export function useCarrito() {
    const [addedProducts, setAddedProducts] = useState<any[]>([]);
    const [code, setCode] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [isOpenBoleta, setIsOpenBoleta] = useState(false);

    const products = useProductStore((state) => state.products);

    const handleAddProduct = () => {
        const foundProduct = products.find((product) => product.id === code);
        if (foundProduct) {
            const currentDate = new Date();
            const discountDueDate = foundProduct.discount?.dueDate ?? undefined;
            const discountValue = foundProduct.discount?.value ?? 0;
            const isDiscountValid = discountDueDate 
                ? currentDate <= discountDueDate
                : false;

            const originalPrice = foundProduct.price;
            const discountedPrice = isDiscountValid
                ? originalPrice * (1 - discountValue / 100)
                : originalPrice;

            // Calcular el IVA para el precio descontado y redondear hacia abajo
            const iva = Math.floor(discountedPrice * 0.19);
            const totalPriceWithIVA = Math.floor(discountedPrice + iva);

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
                        originalPrice,
                        discountedPrice,
                        totalPrice: totalPriceWithIVA * updatedQuantity, // Total con IVA
                    };

                    return updatedProducts;
                } else {
                    const newProduct = {
                        ...foundProduct,
                        quantity,
                        originalPrice,
                        discountedPrice,
                        totalPrice: totalPriceWithIVA * quantity, // Total con IVA
                    };
                    return [...prev, newProduct];
                }
            });

            // Actualizar el total general con el precio total del nuevo producto (con IVA)
            setTotal((prev) => prev + totalPriceWithIVA * quantity);
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
        endSale
    };
}

export default useCarrito;
