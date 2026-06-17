import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/login", formData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login Failed",
      );
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/me");
      console.log("Thunk res", res);

      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  },
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (__, thunkAPI) => {
    try {
      await api.post("/logout");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Logout failed",
      );
    }
  },
);
