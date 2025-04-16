import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const OrderProduct = createAsyncThunk(
  "order/orderproduct",
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/order",
        newOrder
      );

      console.log("Order Response: ", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
