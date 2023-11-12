import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.cart = state.cart.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const selectCart = (state) => state.cart.cart;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
