import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">RestaurantApp</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-lg text-gray-800 hover:text-gray-600">Home</Link>
          <Link to="/login" className="text-lg text-gray-800 hover:text-gray-600">Login</Link>
          <Link to="/signup" className="text-lg text-gray-800 hover:text-gray-600">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
