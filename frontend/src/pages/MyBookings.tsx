import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Header from "../components/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

const MyBookings = () => {
  const { data: hotels, isLoading } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (isLoading) {
    // Skeleton Loader while data is loading
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            My Bookings
          </h1>
          <div className="space-y-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              >
                {/* Skeleton for the image */}
                <div className="lg:w-1/3 h-64 lg:h-auto">
                  <Skeleton className="w-full h-full" />
                </div>

                {/* Skeleton for details */}
                <div className="flex flex-col justify-between p-6 lg:w-2/3">
                  <Skeleton width={200} height={30} />
                  <Skeleton width={150} height={20} className="mt-2" />
                  <div className="mt-4 space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <Skeleton key={i} height={20} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    // Empty State
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          {/* <img
            src="https://via.placeholder.com/150/FFEA99/000000?text=No+Bookings"
            alt="No Bookings Illustration"
            className="w-40 h-40"
          /> */}
          <p className="text-gray-600 text-xl font-medium">
            You don't have any bookings yet!
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
          >
            Explore Hotels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Content Section */}
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          My Bookings
        </h1>

        <div className="space-y-8">
          {hotels.map((hotel) => (
            <div
              
              className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Hotel Image */}
              <div className="lg:w-1/3 h-64 lg:h-auto">
                <img
                  src={hotel.imageUrls[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hotel Details */}
              <div className="flex flex-col justify-between p-6 lg:w-2/3">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {hotel.name}
                  </h2>
                  <p className="flex items-center text-gray-500 mt-2">
                    <MdLocationOn className="text-blue-500 mr-2" />
                    {hotel.city}, {hotel.country}
                  </p>
                </div>

                {/* Booking Details */}
                <div className="mt-4 space-y-4">
                  {hotel.bookings.map((booking, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <AiOutlineCalendar className="text-blue-500 text-xl" />
                        <span className="text-gray-800 font-medium">
                          {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <AiOutlineUser className="text-blue-500 text-xl" />
                        <span className="text-gray-800 font-medium">
                          {booking.adultCount} adults, {booking.childCount}{" "}
                          children
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
