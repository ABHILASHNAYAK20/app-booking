import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white py-24">
      <div className="container mx-auto flex flex-col items-center text-center space-y-10">
        {/* Hero Text */}
        <div>
          <h1 className="text-6xl font-extrabold tracking-wide">
            Find Your Next Stay
          </h1>
          <p className="text-xl max-w-3xl mt-4">
            Discover the best deals on hotels for your dream vacation. Plan your
            perfect getaway with ease.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-5xl">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
