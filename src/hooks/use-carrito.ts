import { useReducer } from "react";
import { products as productList } from "@/data/products";
import { Product } from "@/components/cashier/columns";

interface ProductDetails extends Product {
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  totalPrice: number;
}

interface CartState {
  addedProducts: Product[];
  code: number | null;
  quantity: number;
  total: number;
  isOpenBoleta: boolean;
}

type CartAction =
  | { type: "ADD_PRODUCT"; payload: { code: number; quantity: number } }
  | { type: "SET_CODE"; payload: number | null }
  | { type: "SET_QUANTITY"; payload: number }
  | { type: "TOGGLE_BOLETA" }
  | { type: "END_SALE" };

const initialState = {
    addedProducts: [],
    code: null,
    quantity: 1,
    total: 0,
    isOpenBoleta: false,
  };

export function carritoReducer(state: CartState, action: CartAction): CartState{
    switch (action.type) {
        case "ADD_PRODUCT": {
            const { code, quantity } = action.payload;
            const foundProduct = productList.find((product) => product.id === code);

            if(!foundProduct) return state;

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

            const existingProductIndex = state.addedProducts.findIndex(
                (product) => product.id === code
            );

            let updatedProducts;
            if (existingProductIndex >= 0) {
                updatedProducts = [...state.addedProducts];
                const existingProduct = updatedProducts[existingProductIndex];

                const updatedQuantity = (existingProduct.quantity ?? 0) + quantity;
                updatedProducts[existingProductIndex] = {
                        ...existingProduct,
                        quantity: updatedQuantity,
                        originalPrice,
                        discountedPrice,
                        totalPrice: discountedPrice * updatedQuantity,
                };
                } else {
                    const newProduct: ProductDetails = {
                        ...foundProduct,
                        quantity: quantity || 1,
                        originalPrice: originalPrice || 0,
                        discountedPrice: discountedPrice || 0,
                        totalPrice: discountedPrice * quantity,
                    };
                    updatedProducts = [...state.addedProducts, newProduct];;
                }
                const newTotal = state.total + discountedPrice * quantity;

      return {
        ...state,
        addedProducts: updatedProducts,
        total: newTotal,
        code: null,
        quantity: 1,
      };
    };
    case "SET_CODE":
        return { ...state, code: action.payload };
      
      case "SET_QUANTITY":
        return { ...state, quantity: action.payload };
  
      case "TOGGLE_BOLETA":
        return { ...state, isOpenBoleta: !state.isOpenBoleta };
  
      case "END_SALE":
        return { ...initialState };
  
      default:
        return state;
    }
}

export function useCarrito() {
    const [state, dispatch] = useReducer(carritoReducer, initialState);

    const handleAddProduct = () => {
        if (state.code) {
          dispatch({ type: "ADD_PRODUCT", payload: { code: state.code, quantity: state.quantity } });
        }
      };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddProduct();
        }
    };

    const endSale = () => {
        dispatch({ type: "END_SALE" });
    };

    return {     
        ...state,
        setCode: (code: number | null) => dispatch({ type: "SET_CODE", payload: code }),
        setQuantity: (quantity: number) => dispatch({ type: "SET_QUANTITY", payload: quantity }),
        handleAddProduct,
        handleKeyPress,
        toggleBoleta: () => dispatch({ type: "TOGGLE_BOLETA" }),
        endSale,
    };
}


export default useCarrito;
