import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-8">
        {/* Brand Logo */}
        <div>
          <Link
            to="/"
            className="text-4xl font-bold text-white tracking-wide hover:text-gray-200 transition-all duration-300"
          >
            StayReserve
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="text-lg text-white font-medium hover:text-gray-300 transition duration-200"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="text-lg text-white font-medium hover:text-gray-300 transition duration-200"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="bg-white text-blue-800 font-semibold text-lg py-2 px-6 rounded-full shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
