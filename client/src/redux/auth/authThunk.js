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
        error.response?.data?.message || "Login Failed"
      );
    }
  }
);