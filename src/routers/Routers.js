import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes as needed */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  );
}

export default Routers;
