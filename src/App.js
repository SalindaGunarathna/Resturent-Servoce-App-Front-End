// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//import RestaurantDetail from './components/RestaurantDetail'; // If you have this component
//import AddRestaurant from './components/AddRestaurant'; // If you have this component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RestaurantList />} />
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
