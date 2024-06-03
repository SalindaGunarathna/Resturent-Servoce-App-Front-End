import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null); // State to store restaurant details

    // Fetch restaurant details
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/restaurant/retrieve/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error); 
      }
    };

    fetchRestaurantDetails(); // Call the function
  }, [id]); // Only fetch restaurant details when the ID changes
  
 // Render restaurant details
  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <img
        src={`http://localhost:4000/public/${restaurant.image}`}
        alt={restaurant.name}
        className="h-80 w-full object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-semibold mb-4">{restaurant.name}</h1>
      <p className="text-lg mb-4"><strong>Address:</strong> {restaurant.address}</p>
      <p className="text-lg mb-4"><strong>Telephone:</strong> {restaurant.telephone}</p>
      <p className="text-lg">
        <strong>Description:</strong> {restaurant.description || `Welcome to ${restaurant.name}, a cozy eatery nestled in the heart of ${restaurant.address}.`+
        " Our restaurant offers a delightful fusion of flavors, blending local ingredients with international culinary techniques. Enjoy"
        +"a warm ambiance and impeccable service, perfect for both casual dining and special occasions.Explore our menu featuring a"+
        `variety of dishes crafted with care by our talented chefs. Whether you're craving hearty comfort food or innovative gourme`
         +
        `creations, ${restaurant.name} has something to satisfy every palate.Visit us at ${restaurant.address} or call us at ${restaurant.telephone} `+
        "to reserve your table and experience a memorable dining journey with us."}
'"{'}'}
      </p>
    </div>
  );
};

export default RestaurantDetails;
