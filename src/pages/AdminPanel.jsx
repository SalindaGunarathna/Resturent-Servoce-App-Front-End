import React, { useState } from 'react';
import RestaurantList from './RestaurantList';
import AddRestaurant from './AddRestaurant';

import rebanimage from "../adminpage2.jpg"

const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState('allRestaurants');

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <div className="mb-8 flex items-center justify-center border-b border-gray-300 h-20">
      
      </div>
      <div className="flex">
       
        <div className="w-1/4 pr-8 bg-blue-100 px-4 mr-8 rounded-lg py-4">
          <div className="mb-4">
            <button
              onClick={() => setSelectedTab('allRestaurants')}
              className={`block text-left w-full px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none ${
                selectedTab === 'allRestaurants' ? 'bg-gray-200' : ''
              }`}
            >
              All Restaurants
            </button>
          </div>
          <div className="mb-4 mt-4">
            <button
              onClick={() => setSelectedTab('addRestaurant')}
              className={`block text-left w-full px-4  py-2 rounded-md hover:bg-gray-200 focus:outline-none ${
                selectedTab === 'addRestaurant' ? 'bg-gray-200' : ''
              }`}
            >
              Add Restaurant
            </button>
          </div>
          
        </div>

       
        <div className="w-3/4">
          {selectedTab === 'allRestaurants' && <RestaurantList />}
          {selectedTab === 'addRestaurant' && <AddRestaurant />}
         
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
