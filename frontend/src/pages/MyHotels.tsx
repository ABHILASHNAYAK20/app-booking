import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../components/Header";

const MyHotels = () => {
  const { data: hotelData, isLoading } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Hotels</h1>
          <Link
            to="/add-hotel"
            className="bg-blue-600 text-white text-lg font-medium px-4 py-2 rounded-md shadow hover:bg-blue-500 transition"
          >
            Add Hotel
          </Link>
        </div>

        {isLoading ? (
          // Skeleton Loader
          <div className="grid grid-cols-1 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="p-6 border border-gray-300 rounded-lg shadow-md bg-white"
              >
                <Skeleton height={30} width="50%" />
                <Skeleton count={3} height={20} className="mt-3" />
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} height={40} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : hotelData && hotelData.length > 0 ? (
          // Hotel Cards
          <div className="grid grid-cols-1 gap-8">
            {hotelData.map((hotel) => (
              <div
                key={hotel._id}
                className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
                <p className="text-gray-600 mt-2">{hotel.description}</p>
                <div className="grid grid-cols-5 gap-2 mt-4">
                  <div className="border border-gray-300 rounded-md p-2 flex items-center text-sm text-gray-600">
                    <BsMap className="mr-2 text-blue-500" />
                    {hotel.city}, {hotel.country}
                  </div>
                  <div className="border border-gray-300 rounded-md p-2 flex items-center text-sm text-gray-600">
                    <BsBuilding className="mr-2 text-blue-500" />
                    {hotel.type}
                  </div>
                  <div className="border border-gray-300 rounded-md p-2 flex items-center text-sm text-gray-600">
                    <BiMoney className="mr-2 text-green-500" />
                    ₹{hotel.pricePerNight} per night
                  </div>
                  <div className="border border-gray-300 rounded-md p-2 flex items-center text-sm text-gray-600">
                    <BiHotel className="mr-2 text-purple-500" />
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </div>
                  <div className="border border-gray-300 rounded-md p-2 flex items-center text-sm text-gray-600">
                    <BiStar className="mr-2 text-yellow-500" />
                    {hotel.starRating} Star Rating
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link
                    to={`/edit-hotel/${hotel._id}`}
                    className="bg-blue-600 text-white text-lg font-medium px-4 py-2 rounded-md shadow hover:bg-blue-500 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No Hotels Found
          <div className="text-center text-gray-600 text-lg">
            No hotels found. Click <Link to="/add-hotel" className="text-blue-600 underline">here</Link> to add one.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHotels;
