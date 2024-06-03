import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/restaurant/retrieveall');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleViewRestaurant = (restaurantId) => {
    
    console.log('View restaurant details for:', restaurantId);
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      await axios.delete(`http://localhost:4000/api/restaurant/delete/${restaurantId}`);
      fetchRestaurants(); 
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <div className="flex flex-wrap -mx-4 bg-gray-100">
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="w-1/3 p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={`http://localhost:4000/public/${restaurant.image}`}
              alt={restaurant.name}
              className="h-64 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>
              <p className="text-gray-700 mb-4">{restaurant.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleViewRestaurant(restaurant._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteRestaurant(restaurant._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
