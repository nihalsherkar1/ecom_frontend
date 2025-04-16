import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ pageNumber, pageSize }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );

      console.log("Response: ", response.data.content);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const downloadReport = createAsyncThunk(
  "download/report",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/excel", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));

      console.log("Report Response: ", url);
      return { url, filename: "report.xls" };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
