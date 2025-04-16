import { createSlice } from "@reduxjs/toolkit";
import { OrderProduct } from "./OrderAction";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    order: "",
    status: null,
    error: null,
    responseMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OrderProduct.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(OrderProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
        state.responseMessage = action.payload.message;
      })
      .addCase(OrderProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.responseMessage = action.error.message;
      });
  },
});

export default OrderSlice.reducer;
