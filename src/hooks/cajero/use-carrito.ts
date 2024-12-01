import { useCallback, useReducer } from "react";
import { Producto } from "@/types/products";
import { formatDiscount, priceToInt } from "@/lib/utils";
import { useProducts } from "@/hooks/query/use-products";
import { ToSellProduct } from "@/types/products";
import { DetalleVenta } from "@/types/ventas";

interface CartState {
  addedProducts: ToSellProduct[];
  code: number | null;
  quantity: number;
  total: number;
  isOpenBoleta: boolean;
  detalleVentas: DetalleVenta[];
}

type CartAction =
  | {
      type: "ADD_PRODUCT";
      payload: { code: number; quantity: number; products: Producto[] };
    }
  | {
      type: "ADD_PRODUCT_FROM_SOCKET";
      payload: { code: number; products: Producto[] };
    }
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
  detalleVentas: [],
};

export function carritoReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const foundProduct = action.payload.products.find(
        (product) =>
          product.id === action.payload.code ||
          parseInt(product.codigoBarras ?? "") === action.payload.code
      );
      if (!foundProduct) return state;

      const { price: productPrice, discount, codigoBarras = "" } = foundProduct;
      const price = priceToInt(productPrice);
      const { isValid, value: discountValue } = formatDiscount(discount);
      const discountedPrice = isValid
        ? price - (price * discountValue) / 100
        : price;
      const iva = Math.floor(discountedPrice * 0.19);
      const totalPrice = discountedPrice;

      const existingProductIndex = state.addedProducts.findIndex(
        (product) => product.id === foundProduct.id
      );

      let updatedProducts: ToSellProduct[];
      let updatedDetalleVentas: DetalleVenta[];

      if (existingProductIndex >= 0) {
        updatedProducts = [...state.addedProducts];
        const existingProduct = updatedProducts[existingProductIndex];
        const updatedQuantity =
          existingProduct.quantity + action.payload.quantity;

        updatedProducts[existingProductIndex] = {
          ...existingProduct,
          quantity: updatedQuantity,
          totalPrice: totalPrice * updatedQuantity,
          iva,
        };

        updatedDetalleVentas = state.detalleVentas.map((detalle) =>
          detalle.id_producto === foundProduct.id
            ? {
                ...detalle,
                cantidad: updatedQuantity,
                subtotal: totalPrice * updatedQuantity,
              }
            : detalle
        );
      } else {
        const newProduct: ToSellProduct = {
          originalPrice: price,
          id: foundProduct.id,
          name: foundProduct.name,
          quantity: action.payload.quantity,
          unitPrice: totalPrice,
          totalPrice: totalPrice * action.payload.quantity,
          codigoBarras,
          iva,
          discountValue: discountValue || 0,
          discountedPrice,
        };

        updatedProducts = [...state.addedProducts, newProduct];

        const newDetalleVenta: DetalleVenta = {
          id: Date.now(),
          id_producto: foundProduct.id,
          cantidad: action.payload.quantity,
          subtotal: totalPrice * action.payload.quantity,
        };

        updatedDetalleVentas = [...state.detalleVentas, newDetalleVenta];
      }

      const newTotal = updatedProducts.reduce(
        (acc, product) => acc + product.totalPrice,
        0
      );

      return {
        ...state,
        addedProducts: updatedProducts,
        detalleVentas: updatedDetalleVentas,
        total: newTotal,
        code: null,
        quantity: 1,
      };
    }
    case "ADD_PRODUCT_FROM_SOCKET": {
      const foundProduct = action.payload.products.find(
        (product) =>
          product.id === action.payload.code ||
          parseInt(product.codigoBarras ?? "") === action.payload.code
      );
      if (!foundProduct) return state;

      const { price: productPrice, discount, codigoBarras = "" } = foundProduct;
      const price = priceToInt(productPrice);
      const { isValid, value: discountValue } = formatDiscount(discount);
      const discountedPrice = isValid
        ? price - (price * discountValue) / 100
        : price;
      const iva = Math.floor(discountedPrice * 0.19);
      const totalPrice = discountedPrice;

      const existingProductIndex = state.addedProducts.findIndex(
        (product) => product.id === foundProduct.id
      );

      let updatedProducts: ToSellProduct[];
      let updatedDetalleVentas: DetalleVenta[];

      if (existingProductIndex >= 0) {
        updatedProducts = [...state.addedProducts];
        const existingProduct = updatedProducts[existingProductIndex];
        const updatedQuantity = existingProduct.quantity + 1; // Asumimos cantidad 1 para el socket

        updatedProducts[existingProductIndex] = {
          ...existingProduct,
          quantity: updatedQuantity,
          totalPrice: totalPrice * updatedQuantity,
          iva,
        };

        updatedDetalleVentas = state.detalleVentas.map((detalle) =>
          detalle.id_producto === foundProduct.id
            ? {
                ...detalle,
                cantidad: updatedQuantity,
                subtotal: totalPrice * updatedQuantity,
              }
            : detalle
        );
      } else {
        const newProduct: ToSellProduct = {
          originalPrice: price,
          id: foundProduct.id,
          name: foundProduct.name,
          quantity: 1, // Asumimos cantidad 1 para el socket
          unitPrice: totalPrice,
          totalPrice,
          codigoBarras,
          iva,
          discountValue: discountValue || 0,
          discountedPrice,
        };

        updatedProducts = [...state.addedProducts, newProduct];

        const newDetalleVenta: DetalleVenta = {
          id: Date.now(),
          id_producto: foundProduct.id,
          cantidad: 1,
          subtotal: totalPrice,
        };

        updatedDetalleVentas = [...state.detalleVentas, newDetalleVenta];
      }

      const newTotal = updatedProducts.reduce(
        (acc, product) => acc + product.totalPrice,
        0
      );

      return {
        ...state,
        addedProducts: updatedProducts,
        detalleVentas: updatedDetalleVentas,
        total: newTotal,
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

function useCarrito() {
  const { data: products = [] } = useProducts();
  const [state, dispatch] = useReducer(carritoReducer, initialState);

  const handleAddProduct = useCallback(() => {
    if (state.code && products.length > 0) {
      dispatch({
        type: "ADD_PRODUCT",
        payload: { code: state.code, quantity: state.quantity, products },
      });
    }
  }, [state.code, state.quantity, products]);

  const handleAddProductFromSocket = useCallback(
    (code: number) => {
      if (products.length > 0) {
        dispatch({
          type: "ADD_PRODUCT_FROM_SOCKET",
          payload: { code, products },
        });
      }
    },
    [products]
  );

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
    setCode: (code: number | null) =>
      dispatch({ type: "SET_CODE", payload: code }),
    setQuantity: (quantity: number) =>
      dispatch({ type: "SET_QUANTITY", payload: quantity }),
    handleAddProduct,
    handleKeyPress,
    toggleBoleta: () => dispatch({ type: "TOGGLE_BOLETA" }),
    endSale,
    handleAddProductFromSocket,
  };
}

export default useCarrito;
