import { createSlice } from "@reduxjs/toolkit";
import { loginUser, regiterUser } from "./RegisterAction";

const RegisterSlice = createSlice({
  name: "register",
  initialState: {
    isAuthenticated: false,
    status: false,
    error: null,
    role: null,
    userId: null,
    logout: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setlogout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.userId = null;
      state.status = false;
      state.error = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(regiterUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(regiterUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload.data;
        state.userId = action.payload.data.id; // Store userId when user registers
        localStorage.setItem("user", JSON.stringify(action.payload.data)); // Store user data in local storage for persistent login
      })
      .addCase(regiterUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload.data;
        state.role = action.payload.data.role; // Set role when user logs in
        state.isAuthenticated = true;
        state.userId = action.payload.data.id; // Set userId when user logs in
        localStorage.setItem("user", JSON.stringify(action.payload.data)); // Store user data in local storage for persistent login
      });
  },
});

export const { setError, addProduct, setAuthenticated, setRole, setlogout } =
  RegisterSlice.actions;

export default RegisterSlice.reducer;
