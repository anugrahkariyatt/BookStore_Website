import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/orders");
      return res.data.Orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch orders",
      );
    }
  },
);

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ cartId, shippingAddress, paymentMethod }, thunkAPI) => {
    try {
      const res = await api.post(`/orders/${cartId}`, {
        shippingAddress,
        paymentMethod,
      });

      return res.data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message || "Failed to place order",
      );
    }
  },
);
