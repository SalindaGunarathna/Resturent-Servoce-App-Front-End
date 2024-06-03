import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";

const Routers = () => {
  return (
    <Routes>
      <Route path="/ss" element={<Home />} />

      <Route path="/" element={<AdminPanel />} />

      {/* Add more routes as needed */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  );
}

export default Routers;
