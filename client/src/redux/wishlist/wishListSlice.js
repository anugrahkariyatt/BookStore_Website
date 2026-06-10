import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWishListOpen: false,
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    openWishList: (state) => {
      console.log("wishlist slicer is wroking");

      state.isWishListOpen = true;
    },
    closeWishList: (state) => {
      state.isWishListOpen = false;
    },
  },
});

export const { openWishList, closeWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
