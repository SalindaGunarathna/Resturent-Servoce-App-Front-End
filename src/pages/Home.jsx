import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ParallaxScroll from '../components/UI/ParallaxScroll';
import HeroSlider from '../components/UI/HeroSlider';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get('http://localhost:4000/api/restaurant/retrieveall');
      setRestaurants(response.data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] py-100">
      <HeroSlider />
      <div className="container mx-auto flex-1">
        <h1 className="text-2xl font-bold mb-4">Visit Our Restaurants</h1>
        <ParallaxScroll restaurants={restaurants} />
      </div>
    </div>
  );
};

export default Home;
