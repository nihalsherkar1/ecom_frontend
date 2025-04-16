import { createSlice } from "@reduxjs/toolkit";
import { addProduct, updateProduct } from "./AdminAction";

const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    status: false,
    error: null,
    responseMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload;
        state.responseMessage = action.payload.message;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload;
        state.responseMessage = action.error.message;
      });
  },
});

export default AdminSlice.reducer;
