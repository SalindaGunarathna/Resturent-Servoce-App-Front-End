import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = () => {
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
        image: file,
      });
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      const { name, value } = e.target;
      setRestaurantData({
        ...restaurantData,
        [name]: value,
      });
    }
  };

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
        setRestaurantData({
          name: '',
          address: '',
          telephone: '',
          image: null,
        });
        setPreview(null);
      } else {
        setMessage('Failed to add restaurant');
      }
    } catch (error) {
      setMessage('Error adding restaurant: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-4 bg-gray-100 rounded-md">
      <div className="container mx-auto px-4 sm:px-8 flex-1">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">Add Restaurant</h2>
        {message && (
          <div className="mb-4 text-center">
            <p className="text-green-500">{message}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:space-x-8">
          <div className="flex-1 space-y-4">
            <div>
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
                className="w-full sm:w-80 border-gray-300 rounded-md shadow-sm bg-gray-200 h-10 px-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
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
                className="w-full sm:w-80 border-gray-300 rounded-md shadow-sm bg-gray-200 h-10 px-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
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
                className="w-full sm:w-80 border-gray-300 rounded-md shadow-sm bg-gray-200 h-10 px-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex-1 space-y-4 mt-4 sm:mt-0">
            <div>
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Image Preview"
                  className="w-full h-64 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Restaurant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
