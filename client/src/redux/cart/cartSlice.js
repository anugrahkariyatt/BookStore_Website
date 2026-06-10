import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
