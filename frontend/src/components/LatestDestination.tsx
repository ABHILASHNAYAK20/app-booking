import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <div className="flex justify-center"> {/* Centering the cards */}
      <Link
        to={`/detail/${hotel._id}`}
        className="flex items-center w-[500px] h-[200px] border border-gray-300 rounded-md overflow-hidden transition-transform duration-300 hover:scale-105 bg-white shadow-md p-2"
      >
        {/* Image Section */}
        <div className="w-1/2 h-full">
          <img
            src={hotel.imageUrls[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section - Centered */}
        <div className="w-1/2 h-full flex flex-col justify-center bg-gray-100 p-4">
          <span className="text-black font-semibold text-lg text-center">
            {hotel.name}
          </span>
          <span className="text-gray-700 text-sm text-center mt-1">
            {hotel.description.length > 100
              ? `${hotel.description.slice(0, 100)}...`
              : hotel.description}
          </span>
          <span className="text-green-600 font-bold text-center mt-2">
          ₹{hotel.pricePerNight} / night
          </span>
          {/* Facilities Section */}
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LatestDestinationCard;
