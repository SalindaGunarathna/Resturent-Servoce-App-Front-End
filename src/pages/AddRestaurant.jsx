import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = ({ onClose }) => {
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    address: '',
    telephone: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setRestaurantData({
        ...restaurantData,
        image: file, // Store the image file in the state
      });
      const previewUrl = URL.createObjectURL(file); // Create a preview URL for the uploaded image
      setPreview(previewUrl);
    } else {
      const { name, value } = e.target;
      setRestaurantData({
        ...restaurantData,
        [name]: value,
      });
    }
  };
  // Add the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', restaurantData.name);
      formData.append('address', restaurantData.address);
      formData.append('telephone', restaurantData.telephone);
      formData.append('image', restaurantData.image);

      const response = await axios.post('http://localhost:4000/api/restaurant/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setMessage('Restaurant added successfully');
        // Reset form
        setRestaurantData({
          name: '',
          address: '',
          telephone: '',
          image: null,
        });
        
        setPreview(null);
        if (typeof onClose === 'function') {
          onClose(); 
        }
      } else {
        setMessage('Failed to add restaurant');
      }
    } catch (error) {
      setMessage('Error adding restaurant: ' + error.message); // Display  unknown error message
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">Add Restaurant</h2>
      {message && (
        <div className="mb-4 text-center">
          <p className="text-green-500">{message}</p>
        </div>
      )}
      <div className="h-40">
        {preview && (
          <div className="flex items-center mb-4 h-40">
            <div className="relative w-1/2 h-40 rounded-lg overflow-hidden shadow-md">
              <img
                src={preview}
                alt="Image Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={restaurantData.name}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={restaurantData.address}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
              Telephone
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={restaurantData.telephone}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md 
              shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border
             border-transparent shadow-sm text-sm font-medium rounded-md 
             text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Restaurant
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
