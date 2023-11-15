import { createContext, useReducer, useState } from "react";
export const Context = createContext();

const initialCartState = { cart: [], subTotal: 0, totalQuantity: 0 };

const ADD_TO_CART = (state, action) => {
  const productId = action.payload.cartItem.id;
  const productExistInCart = state.cart.find((item) => item.id === productId);

  if (productExistInCart) {
    const existingItem =
      state.cart[state.cart.findIndex((item) => item.id === productId)];
    const updatedItemQuantity =
      action.payload.cartItem.quantity + existingItem.quantity;
    const updatedCartItem = {
      ...existingItem,
      quantity: updatedItemQuantity,
    };
    const updatedCart = state.cart.map((item) => {
      return item.id === productId ? updatedCartItem : item;
    });
    const updatedSubTotal = updatedCart.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    const updatedTotalQuantity = updatedCart.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
    return {
      cart: updatedCart,
      subTotal: updatedSubTotal,
      totalQuantity: updatedTotalQuantity,
    };
  } else {
    const newItem = action.payload.cartItem;
    const updatedCart = [...state.cart, newItem];
    const updatedSubTotal = updatedCart.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    const updatedTotalQuantity = updatedCart.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
    return {
      cart: updatedCart,
      subTotal: updatedSubTotal,
      totalQuantity: updatedTotalQuantity,
    };
  }
};

const REMOVE_FROM_CART = (state, action) => {
  const productId = action.payload.cartItem.id;
  const productExistInCart = state.cart.find((item) => item.id === productId);

  if (productExistInCart) {
    const existingItem =
      state.cart[state.cart.findIndex((item) => item.id === productId)];
    const itemQuantity = existingItem.quantity;
    if (
      itemQuantity === 1 ||
      existingItem.quantity === action.payload.cartItem.quantity
    ) {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      const updatedSubTotal = updatedCart.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);
      const updatedTotalQuantity = updatedCart.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
      return {
        cart: updatedCart,
        subTotal: updatedSubTotal,
        totalQuantity: updatedTotalQuantity,
      };
    } else {
      const updatedItemQuantity =
        existingItem.quantity - action.payload.cartItem.quantity;
      const updatedCartItem = {
        ...existingItem,
        quantity: updatedItemQuantity,
      };
      const updatedCart = state.cart.map((item) => {
        return item.id === productId ? updatedCartItem : item;
      });
      const updatedSubTotal = updatedCart.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);
      const updatedTotalQuantity = updatedCart.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
      return {
        cart: updatedCart,
        subTotal: updatedSubTotal,
        totalQuantity: updatedTotalQuantity,
      };
    }
  }
};

const reducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    return ADD_TO_CART(state, action);
  }
  if (action.type === "REMOVE_FROM_CART") {
    return REMOVE_FROM_CART(state, action);
  } else {
    return {
      cart: state.cart,
      subTotal: state.cart.subTotal,
      totalQuantity: state.cart.totalQuantity,
    };
  }
};

const AppContext = ({ children }) => {
  const [cartState, dispatchFn] = useReducer(reducer, initialCartState);
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();

  return (
    <Context.Provider
      value={{
        cartState,
        dispatchFn,
        categories,
        products,
        setCategories,
        setProducts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
