import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#D5D2CF] py-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        {/* Left Side: Social Media Links and Contact Information */}
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <p className="text-lg mb-2">Follow us on social media</p>
          <div className="space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
          <div>
            <p className="text-lg mb-2">Contact us</p>
            <p className="text-gray-800">Email: contact@restaurantapp.com</p>
            <p className="text-gray-800">Phone: +123-456-7890</p>
          </div>
        </div>

        {/* Right Side: Description */}
        <div className="w-full md:w-auto">
          <p className="text-lg mb-2">About Us</p>
          <p className="text-gray-800 max-w-2xl">
            Welcome to RestaurantApp, your number one source for finding the best dining experiences in town. We are dedicated to providing you with the best service and delicious food, with a focus on quality, customer service, and uniqueness.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
