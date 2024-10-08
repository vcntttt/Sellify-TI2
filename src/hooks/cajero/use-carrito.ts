import { useReducer } from "react";
import { useProductStore } from "@/store/products"; 
import { Product } from "@/components/cajero/columns";
import { formatDiscount } from "@/lib/utils"; // Asegúrate de que formatDiscount esté exportada correctamente

interface ProductDetails extends Product {
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  totalPrice: number;
  iva: number; 
}

interface CartState {
  addedProducts: ProductDetails[];
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

const initialState: CartState = {
  addedProducts: [],
  code: null,
  quantity: 1,
  total: 0,
  isOpenBoleta: false,
};

export function carritoReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const products = useProductStore.getState().products; 
      const foundProduct = products.find((product) => product.id === action.payload.code);

      if (!foundProduct) return state; 

      const { price, discount } = foundProduct;
      const { isValid, value } = formatDiscount(discount); 
      const discountedPrice = isValid ? price - (price * value) / 100 : price;
      const iva = Math.floor(discountedPrice * 0.19); 
      const totalPriceWithIva = discountedPrice + iva; 

      const existingProductIndex = state.addedProducts.findIndex(
        (product) => product.id === foundProduct.id
      );

      let updatedProducts: ProductDetails[];

      if (existingProductIndex >= 0) {
        updatedProducts = [...state.addedProducts];
        const existingProduct = updatedProducts[existingProductIndex];
        const updatedQuantity = existingProduct.quantity + action.payload.quantity;

        updatedProducts[existingProductIndex] = {
          ...existingProduct,
          quantity: updatedQuantity,
          totalPrice: totalPriceWithIva * updatedQuantity,
          iva, 
        };
      } else {
        const newProduct: ProductDetails = {
          ...foundProduct,
          quantity: action.payload.quantity,
          originalPrice: price,
          discountedPrice,
          totalPrice: totalPriceWithIva * action.payload.quantity,
          iva, 
        };
        updatedProducts = [...state.addedProducts, newProduct];
      }

      const newTotal = updatedProducts.reduce((acc, product) => acc + product.totalPrice, 0);

      return {
        ...state,
        addedProducts: updatedProducts,
        total: newTotal,
        code: null,
        quantity: 1,
      };
    }
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
