import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDestination(value);

    if (value.length > 0) {
      const filteredSuggestions = cities.filter(city =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setDestination(city);
    setSuggestions([]);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
    onSubmit={handleSubmit}
    className="p-4 bg-white bg-opacity-80 rounded-lg shadow-lg flex items-center space-x-4 max-w-6xl mx-auto"
  >
     {/* Destination Input */}
   {/* Destination Input */}
<div className="relative w-full max-w-xs">
  <div className="flex items-center bg-gray-200 bg-opacity-70 p-2 rounded-md shadow-sm">
    <MdTravelExplore size={24} className="mr-2 text-blue-600" />
    <input
      placeholder="Where are you going?"
      className="text-base w-full bg-transparent text-gray-800 placeholder-gray-600 focus:outline-none"
      value={destination}
      onChange={handleDestinationChange}
    />
  </div>
  {suggestions.length > 0 && (
    <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-auto z-10 w-full">
      {suggestions.map((city, index) => (
        <li
          key={index}
          className="p-3 hover:bg-blue-100 cursor-pointer text-gray-800"
          onClick={() => handleSuggestionClick(city)}
        >
          {city}
        </li>
      ))}
    </ul>
  )}
</div>

  
    {/* Adults and Children Input */}
    <div className="flex items-center space-x-2">
      <label className="flex items-center bg-gray-200 bg-opacity-70 p-2 rounded-md shadow-sm">
        <span className="text-gray-800 text-sm font-semibold mr-2">Adults:</span>
        <input
          className="w-14 text-center p-1 rounded-md bg-white bg-opacity-80 text-gray-800 placeholder-gray-500 focus:outline-none border border-gray-300"
          type="number"
          min={1}
          max={20}
          value={adultCount}
          onChange={(event) => setAdultCount(parseInt(event.target.value))}
        />
      </label>
      <label className="flex items-center bg-gray-200 bg-opacity-70 p-2 rounded-md shadow-sm">
        <span className="text-gray-800 text-sm font-semibold mr-2">Children:</span>
        <input
          className="w-14 text-center p-1 rounded-md bg-white bg-opacity-80 text-gray-800 placeholder-gray-500 focus:outline-none border border-gray-300"
          type="number"
          min={0}
          max={20}
          value={childCount}
          onChange={(event) => setChildCount(parseInt(event.target.value))}
        />
      </label>
    </div>
  
    {/* Check-In Date Picker */}
    <div className="flex flex-col items-start">
      <label className="text-gray-800 text-sm font-semibold mb-1">From</label>
      <DatePicker
        selected={checkIn}
        onChange={(date) => setCheckIn(date as Date)}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText="Check-in"
        className="w-full bg-gray-200 bg-opacity-70 p-2 rounded-md text-gray-800 placeholder-gray-600 focus:outline-none border border-gray-300"
      />
    </div>
  
    {/* Check-Out Date Picker */}
    <div className="flex flex-col items-start">
      <label className="text-gray-800 text-sm font-semibold mb-1">To</label>
      <DatePicker
        selected={checkOut}
        onChange={(date) => setCheckOut(date as Date)}
        selectsEnd
        startDate={checkIn}
        endDate={checkOut}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText="Check-out"
        className="w-full bg-gray-200 bg-opacity-70 p-2 rounded-md text-gray-800 placeholder-gray-600 focus:outline-none border border-gray-300"
      />
    </div>
  
    {/* Search and Clear Buttons */}
    <div className="flex space-x-2">
      <button
        className="bg-blue-600 bg-opacity-80 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-500 transition-all"
        type="submit"
      >
        Search
      </button>
      <button
        className="bg-red-600 bg-opacity-80 text-white py-2 px-4 rounded-md font-bold hover:bg-red-500 transition-all"
        type="button"
        onClick={() => {
          setDestination('');
          setCheckIn(minDate);
          setCheckOut(minDate);
          setAdultCount(1);
          setChildCount(0);
        }}
      >
        Clear
      </button>
    </div>
  </form>
  
  )
}

export default SearchBar