import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import RestaurantDetails from "../pages/RestaurantDetails";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />

      {/* Add more routes as needed */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  );
}

export default Routers;
