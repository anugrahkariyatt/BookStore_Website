import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import wishlistReducer from "./wishlist/wishListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
