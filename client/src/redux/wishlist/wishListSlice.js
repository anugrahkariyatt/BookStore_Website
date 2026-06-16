import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "bookloom_wishlist";

const readStoredWishlist = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeStoredWishlist = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage failures and keep wishlist in memory.
  }
};

const initialState = {
  isWishListOpen: false,
  items: readStoredWishlist(),
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    openWishList: (state) => {
      state.isWishListOpen = true;
    },
    closeWishList: (state) => {
      state.isWishListOpen = false;
    },
    addToWishList: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (!existingItem) {
        state.items.unshift(action.payload);
        writeStoredWishlist(state.items);
      }
    },
    removeFromWishList: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      writeStoredWishlist(state.items);
    },
    clearWishList: (state) => {
      state.items = [];
      writeStoredWishlist(state.items);
    },
  },
});

export const {
  openWishList,
  closeWishList,
  addToWishList,
  removeFromWishList,
  clearWishList,
} = wishListSlice.actions;
export default wishListSlice.reducer;
