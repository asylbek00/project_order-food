import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedTotalAmount = state.totalAmount + action.item.price;
      const existingCartItemIndex = state.items?.findIndex((item) => {
        return item.id === action.item.id; //находим индекс сущ. обьекта
      });
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "REMOVE": {
      const existingCartItemIndex = state.items?.findIndex((item) => {
        return item.id === action.id; //находим индекс сущ. обьекта
      });
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
