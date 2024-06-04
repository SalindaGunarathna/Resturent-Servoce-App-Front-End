import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilAltIcon } from '@heroicons/react/outline';

const EditRestaurant = ({ restaurantId, onClose }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    telephone: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editMode, setEditMode] = useState(false); // Track whether edit mode is active
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errors, setErrors] = useState({}); // State for form validation errors

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/restaurant/retrieve/${restaurantId}`);
      setRestaurant(response.data);
      setFormData({
        name: response.data.name,
        address: response.data.address,
        telephone: response.data.telephone,
      });
      setImagePreview(`http://localhost:4000/public/${response.data.image}`);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  const toggleEditMode = (field) => {
    if (field) {
      // Toggle specific field edit mode
      setEditMode(true);
    } else {
      // Toggle all fields edit mode
      setEditMode(!editMode);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // Validate telephone format
    const telephoneRegex = /^\d{10,15}$/;
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Telephone is required';
      isValid = false;
    } else if (!telephoneRegex.test(formData.telephone.trim())) {
      newErrors.telephone = 'Telephone must be between 10 to 15 digits only include number';
      isValid = false;
    }

   

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('address', formData.address);
      formDataToSubmit.append('telephone', formData.telephone);
      if (formData.image) {
        formDataToSubmit.append('image', formData.image);
      }

      const token = localStorage.getItem('token'); // Retrieve token from local storage

      const response = await axios.put(
        `http://localhost:4000/api/restaurant/update/${restaurantId}`,
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Pass the token as a Bearer token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        setShowSuccessDialog(true);
        setTimeout(() => {
          setShowSuccessDialog(false);
        }, 3000); // delay for 3 seconds
      } else {
        alert('Failed to update restaurant');
      }
    } catch (error) {
      console.error('Error updating restaurant:', error);
      alert('Error updating restaurant');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">{restaurant?.name} Restaurant</h2>
      {restaurant && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative w-1/2 h-40 rounded-lg overflow-hidden shadow-md">
              <img
                src={imagePreview || `http://localhost:4000/public/${restaurant.image}`}
                alt={restaurant.name}
                className="w-full h-full object-cover"
                style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Change Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full border-gray-300
                 rounded-md shadow-sm focus:border-blue-500
                  focus:ring-blue-500 sm:text-sm"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="name" className="block w-1/4 text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="flex items-center w-3/4">
              <input
                type="text"
                id="name"
                name="name"
                maxLength={200} // Example maximum length
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border-gray-300 rounded-md
                 shadow-sm h-10 px-2 focus:ring-blue-500 
                 sm:text-sm ${!editMode ? 'bg-gray-100' : ''}`}
              />
              <PencilAltIcon
                className="h-5 w-5 text-gray-400 cursor-pointer ml-2"
                onClick={() => toggleEditMode('name')}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="address" className="block w-1/4 text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="flex items-center w-3/4">
              <input
                type="text"
                id="address"
                name="address"
                maxLength={200} // Example maximum length
                value={formData.address}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border-gray-300 rounded-md 
                shadow-sm h-10 px-2 focus:ring-blue-500 
                sm:text-sm ${!editMode ? 'bg-gray-100' : ''}`}
              />
              <PencilAltIcon
                className="h-5 w-5 text-gray-400 cursor-pointer ml-2"
                onClick={() => toggleEditMode('address')}
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="telephone" className="block w-1/4 text-sm font-medium text-gray-700">
              Telephone
            </label>
            <div className="flex items-center w-3/4">
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border-gray-300 rounded-md
                 shadow-sm h-10 px-2 focus:ring-blue-500
                  sm:text-sm ${!editMode ? 'bg-gray-100' : ''}`}
              />
              <PencilAltIcon
                className="h-5 w-5 text-gray-400 cursor-pointer ml-2"
                onClick={() => toggleEditMode('telephone')}
              />
            </div>
            {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
          </div>
          <div className="flex items-center justify-end">
            {editMode && (
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border 
                border-transparent shadow-sm text-sm font-medium rounded-md 
                text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
                 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-4 inline-flex justify-center 
              py-2 px-4 border border-gray-300 shadow-sm text-sm 
              font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
          {showSuccessDialog && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg text-center">Restaurant updated successfully!</p>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default EditRestaurant;
