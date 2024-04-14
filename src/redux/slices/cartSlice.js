import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.unshift(action.payload);
    },

    updateQuantity: (state, action) => {
      const { method, id } = action.payload;

      const findItem = state.cart.find((item) => item.id === id);

      if (findItem?.id) {
        switch (method) {
          case "+":
            findItem.quantity += 1;
            break;
          case "-":
            findItem.quantity -= 1;
        }
      }
    },

    deleteItemFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// selectors
export const selectCart = (state) => state.cart.cart;

// actions
export const { addToCart, updateQuantity, deleteItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
