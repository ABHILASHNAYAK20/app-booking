import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import Header from "../components/Header";

const Details = () => {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-6 py-8 space-y-10">
          {/* Skeleton for Title */}
          <Skeleton height={40} width="50%" />
          <Skeleton height={20} width="30%" />

          {/* Skeleton for Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height={300} />
            ))}
          </div>

          {/* Skeleton for Facilities */}
          <Skeleton height={30} width="30%" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} height={50} />
            ))}
          </div>

          {/* Skeleton for Description and Form */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <Skeleton height={200} />
            <Skeleton height={200} />
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return <div className="text-center mt-10 text-gray-500">No hotel found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hotel Details Section */}
      <div className="container mx-auto px-6 py-8 space-y-10">
        {/* Title and Star Rating */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-bold text-gray-800">{hotel.name}</h1>
          <div className="flex items-center gap-1">
            {Array.from({ length: hotel.starRating }).map((_, index) => (
              <AiFillStar key={index} className="text-yellow-500 text-2xl" />
            ))}
          </div>
        </div>

        {/* Images Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotel.imageUrls.map((image, index) => (
            <div
              key={index}
              className="h-[300px] rounded-md overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Facilities Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Facilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotel.facilities.map((facility, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white rounded-md p-4 text-gray-700 text-center shadow-sm hover:shadow-lg transition duration-300"
              >
                {facility}
              </div>
            ))}
          </div>
        </div>

        {/* Description and Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="bg-white rounded-md p-6 shadow-sm leading-relaxed text-gray-700 whitespace-pre-line">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            {hotel.description}
          </div>

          <div className="bg-white rounded-md p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Book Your Stay
            </h2>
            <GuestInfoForm
              pricePerNight={hotel.pricePerNight}
              hotelId={hotel._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
