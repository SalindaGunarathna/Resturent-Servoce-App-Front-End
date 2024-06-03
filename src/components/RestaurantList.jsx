import React, { useEffect, useState } from 'react';
import axios from 'axios';

import HeroSlider from "./UI/HeroSlider";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get('http://localhost:4000/api/restaurant/retrieveall');
      setRestaurants(response.data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div>

    <HeroSlider></HeroSlider>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant._id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-semibold">{restaurant.name}</h2>
              <p>{restaurant.address}</p>
              <p>{restaurant.telephone}</p>
              <img src={`http://localhost:4000/public/${restaurant.image}`} alt={restaurant.name} className="w-full h-auto" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantList;
