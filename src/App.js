import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import Routers from "./routers/Routers";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routers />
      <Footer />
    </Router>
  );
};

export default App;
