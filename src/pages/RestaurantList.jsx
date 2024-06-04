import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';



const RestaurantList = ({ onViewRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);

  // Delete Confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    restaurantId: null,
    restaurantName: '', 
  });

  useEffect(() => {
    fetchRestaurants(); // Call the function
  }, []); // Only call the function when the component mounts
 
  // Fetch restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/restaurant/retrieveall');
      setRestaurants(response.data); // Update the state
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };
 
  // View Restaurant
  const handleViewRestaurant = (restaurantId) => {
    console.log('View restaurant details for:', restaurantId);
    onViewRestaurant(restaurantId); // Pass the restaurant ID to the parent component
  };

    // Delete Confirmation
  const openDeleteConfirmation = (restaurantId, restaurantName) => {
    setDeleteConfirmation({
      isOpen: true,
      restaurantId,
      restaurantName,
    }); // Update the state
  };

  // Close Delete Confirmation
  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      restaurantId: null,
      restaurantName: '',
    }); // Update the state
  };

  // Confirm Delete
  const confirmDeleteRestaurant = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      await axios.delete(`http://localhost:4000/api/restaurant/delete/${deleteConfirmation.restaurantId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Pass the token as a Bearer token in the Authorization header
        },
      });
      
      
      fetchRestaurants(); // Refresh the restaurant list after deletion
      closeDeleteConfirmation(); // Close the delete confirmation dialog
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
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
                >
                  <FontAwesomeIcon icon={faEye} className="text-lg mr-2" />
                  View
                </button>
                <button
                  onClick={() => openDeleteConfirmation(restaurant._id, restaurant.name)}
                  className="bg-red-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-lg mr-2" />
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
                    Yes
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
