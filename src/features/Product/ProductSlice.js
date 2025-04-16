import { createSlice } from "@reduxjs/toolkit";
import { downloadReport, fetchProducts } from "./ProductAction";
import { downloadFile } from "../../components/Admin/AddminProductList";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: { content: [] },
    error: null,
    status: false,
    showSuccessModal: false,
    search: "",
    searchedData: [],
    loading: false,
  },
  reducers: {
    hideSuccessMoal: (state) => {
      state.showSuccessModal = false;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSearchedData: (state, action) => {
      state.searchedData = action.payload;
    },
    clearSearchedData: (state) => {
      state.searchedData = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(downloadReport.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(downloadReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.showSuccessModal = true;
        const { url, filename } = action.payload;
        downloadFile(url, filename);
      })
      .addCase(downloadReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.showSuccessModal = true;
      });
  },
});

export const {
  hideSuccessMoal,
  setSearch,
  setSearchedData,
  clearSearchedData,
  setLoading,
} = productSlice.actions;

export default productSlice.reducer;
