import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";
import BookingForm from "../forms/BookingForm/BookingForm";
import Header from "../components/Header";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.VITE_STRIPE_PUB_KEY as string);

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData, isLoading: isPaymentLoading } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  const { data: hotel, isLoading: isHotelLoading } = useQuery(
    "fetchHotelByID",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser, isLoading: isUserLoading } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (isHotelLoading || isPaymentLoading || isUserLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />

        {/* Booking Page Layout with Skeleton Loader */}
        <div className="container mx-auto px-6 py-10 space-y-10">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Complete Your Booking
          </h1>

          <div className="grid md:grid-cols-[1fr_2fr] gap-8">
            {/* Booking Summary Section Skeleton */}
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Payment Form Section Skeleton */}
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Booking Page Layout */}
      <div className="container mx-auto px-6 py-10 space-y-10">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Complete Your Booking
        </h1>

        {/* Booking Content */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          {/* Booking Summary Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <BookingDetailsSummary
              checkIn={search.checkIn}
              checkOut={search.checkOut}
              adultCount={search.adultCount}
              childCount={search.childCount}
              numberOfNights={numberOfNights}
              hotel={hotel}
            />
          </div>

          {/* Booking Form Section */}
          
          {currentUser && paymentIntentData&& (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Payment & Guest Details
              </h2>
              
              <Elements stripe={stripePromise} options={{ clientSecret: paymentIntentData.clientSecret }}>
  <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
</Elements>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
