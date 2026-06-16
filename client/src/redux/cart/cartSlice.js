import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, removeFromCart, updateCartQuantity } from "./cartThunk";

const initialState = {
  isCartOpen: false,
  items: [],
  loading: false,
  error: null,
  totalCount: 0,
  totalPrice: 0,
};

const calculateTotals = (state) => {
  state.totalCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
  state.totalPrice = state.items.reduce(
    (acc, item) => acc + item.bookId.price * item.quantity,
    0,
  );
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
    setCartItems: (state, action) => {
      state.items = action.payload;
      calculateTotals(state);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      calculateTotals(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
        calculateTotals(state);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        calculateTotals(state);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove item";
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
        calculateTotals(state);
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update cart quantity";
      });
  },
});

export const { openCart, closeCart, removeItem, setCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
