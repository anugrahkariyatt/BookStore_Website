import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/cart");
      return res.data.Cart.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message || "Failed to fetch cart",
      );
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (bookId, thunkAPI) => {
    try {
      const res = await api.delete(`/cart/${bookId}`);
      return res.data.Cart.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message || "Failed to remove item",
      );
    }
  },
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      const res = await api.patch(`/cart/${cartItemId}`, { quantity });
      return res.data.Cart.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Failed to update cart quantity",
      );
    }
  },
);
