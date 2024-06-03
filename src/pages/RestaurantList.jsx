import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    restaurantId: null,
    restaurantName: '',
  });

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

  const openDeleteConfirmation = (restaurantId, restaurantName) => {
    setDeleteConfirmation({
      isOpen: true,
      restaurantId,
      restaurantName,
    });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      restaurantId: null,
      restaurantName: '',
    });
  };

  const confirmDeleteRestaurant = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/restaurant/delete/${deleteConfirmation.restaurantId}`);
      fetchRestaurants(); // Refresh the restaurant list after deletion
      closeDeleteConfirmation();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <div className="flex flex-wrap -mx-4 bg-gray-100">
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="w-full md:w-1/3 p-4 relative">
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
                  onClick={() => openDeleteConfirmation(restaurant._id, restaurant.name)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {/* Delete Confirmation Dialog */}
          {deleteConfirmation.isOpen && deleteConfirmation.restaurantId === restaurant._id && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-40">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete "{deleteConfirmation.restaurantName}"?</p>
                <div className="flex justify-between">
                  <button
                    onClick={confirmDeleteRestaurant}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                  >
                    yes
                  </button>
                  <button
                    onClick={closeDeleteConfirmation}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
