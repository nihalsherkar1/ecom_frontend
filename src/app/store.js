import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/Product/ProductSlice.js";
import CartReducer from "../features/Cart/CartSlice.js";
import OrderReducer from "../features/Order/OrderSlice.js";
import RegisterReducer from "../features/Auth/Regisiter.js";
import AdminReducer from "../features/Admin/AminSlice.js";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    order: OrderReducer,
    register: RegisterReducer,
    admin: AdminReducer,
  },
});
