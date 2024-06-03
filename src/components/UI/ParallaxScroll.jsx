import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn.ts";
import React from "react";

const ParallaxScroll = ({ restaurants, className }) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(restaurants.length / 3);

  const firstPart = restaurants.slice(0, third);
  const secondPart = restaurants.slice(third, 2 * third);
  const thirdPart = restaurants.slice(2 * third);

  const handleViewDetails = (restaurantId) => {
    // Navigate to single restaurant page
    window.location.href = `/restaurant/${restaurantId}`;
  };

  return (
    <div
      className={cn("overflow-y-auto w-full", className)}
      ref={gridRef}
      style={{ height: '100vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>
        {`
          /* For Chrome, Safari, and Opera */
          .overflow-y-auto::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-10 px-10">
        <div className="grid gap-10">
          {firstPart.map((restaurant, idx) => (
            <motion.div style={{ y: translateFirst }} key={"grid-1" + idx} className="relative">
              <img
                src={`http://localhost:4000/public/${restaurant.image}`}
                className="h-80 w-full object-cover object-left-top rounded-lg"
                height={400}
                width={400}
                alt={restaurant.name}
              />
              <div className="absolute bottom-4 left-4 bg-white p-2 rounded">
                <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                <p>{restaurant.address}</p>
                <p>{restaurant.telephone}</p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleViewDetails(restaurant._id)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((restaurant, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx} className="relative">
              <img
                src={`http://localhost:4000/public/${restaurant.image}`}
                className="h-80 w-full object-cover object-left-top rounded-lg"
                height={400}
                width={400}
                alt={restaurant.name}
              />
              <div className="absolute bottom-4 left-4 bg-white p-2 rounded">
                <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                <p>{restaurant.address}</p>
                <p>{restaurant.telephone}</p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleViewDetails(restaurant._id)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((restaurant, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx} className="relative">
              <img
                src={`http://localhost:4000/public/${restaurant.image}`}
                className="h-80 w-full object-cover object-left-top rounded-lg"
                height={400}
                width={400}
                alt={restaurant.name}
              />
              <div className="absolute bottom-4 left-4 bg-white p-2 rounded">
                <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                <p>{restaurant.address}</p>
                <p>{restaurant.telephone}</p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleViewDetails(restaurant._id)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
