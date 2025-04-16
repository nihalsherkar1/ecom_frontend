import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ProductOverview from "./components/Product";

import ShoppingCart from "./components/ShoppingCart";
import Product from "./components/Product";
import PromoSection from "./components/PromoSection";
import List from "./components/List";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "./features/Product/ProductAction";
import { Slide, toast, ToastContainer } from "react-toastify";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import DefaultNavbar from "./components/DefaultNavbar";
import AddProduct from "./components/Admin/AddProduct";
import AdminNavbar from "./components/Admin/AdminNavbar";
import AddminProductList from "./components/Admin/AddminProductList";
import PaymentComponent from "./components/Payment/PaymentComponent";
import { setAuthenticated } from "./features/Auth/Regisiter";
import Profile from "./components/User/Profile";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div className="MainContent">
            <MainApp />
          </div>
        </div>
      </Router>
    </>
  );
}

const MainApp = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.register);
  console.log("Data: ", isAuthenticated);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  console.log("Data: ", isAuthenticated);
  console.log("Location: ", location.pathname);
  console.log("Is Admin Route: ", isAdminRoute);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setAuthenticated(true));
    }
  }, [dispatch]);

  return (
    <>
      {console.log("ISAuthenticated:  ", isAuthenticated)}
      {isAuthenticated ? <Navbar /> : <DefaultNavbar />}
      {/* {isAuthenticated ? (
        isAdminRoute ? (
          <AdminNavbar />
        ) : (
          <Navbar />
        )
      ) : (
        <DefaultNavbar />
      )} */}

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/promo" element={<PromoSection />} />
        <Route path="/list" element={<List />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/productlist" element={<AddminProductList />} />
      </Routes>
    </>
  );
};

export default App;
