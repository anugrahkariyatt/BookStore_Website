import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import wishlistReducer from "./wishlist/wishListSlice";
import ordersReducer from "./orders/ordersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
});
