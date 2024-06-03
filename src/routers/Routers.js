import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import RestaurantDetails from "../pages/RestaurantDetails";
import LoginPage from "../pages/LoginPage";
import Signup from "../pages/SignupPage";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
    </Routes>
  );
}

export default Routers;
