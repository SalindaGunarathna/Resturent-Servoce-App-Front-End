import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import Routers from "./routers/Routers";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routers />
    </Router>
  );
};

export default App;
