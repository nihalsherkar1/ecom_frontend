import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const regiterUser = createAsyncThunk(
  "user/register",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register/add",
        newUser
      );
      console.log("Response: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register/login",
        newUser
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
