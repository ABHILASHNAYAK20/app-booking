import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestination";

const Home = () => {
  const { data: hotels, isLoading } = useQuery("fetchHotels", apiClient.fetchHotels);

  const featuredHotels = [
    { id: 1, name: "Luxury Hotel", image: "/path/to/image1.jpg", description: "A luxury experience", price: 5000 },
    { id: 2, name: "Cozy Stay", image: "/path/to/image2.jpg", description: "Feel at home", price: 3000 },
  ];

  const reviews = [
    { id: 1, author: "John Doe", message: "Amazing experience, loved the service!" },
    { id: 2, author: "Jane Smith", message: "Highly recommended for families!" },
  ];

  const blogs = [
    { id: 1, title: "Top 5 Destinations", image: "./src/assets/destinations.jpg", excerpt: "Explore the best travel spots...", link: "https://example.com/top-5-destinations" },
    { id: 2, title: "Budget Travel Tips", image: "./src/assets/budget(1).jpg", excerpt: "Save more while traveling...", link: "https://example.com/budget-travel-tips" },
  ];

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-12 px-6 py-8 bg-gradient-to-b from-white to-gray-100">
      {/* Section: Latest Destinations */}
      <section className="space-y-6">
        <h2 className="text-4xl font-extrabold text-gray-800">Latest Destinations</h2>
        <p className="text-gray-500">Explore the most recently added destinations by our hosts.</p>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-gray-200 h-40 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topRowHotels.map((hotel) => (
              <LatestDestinationCard  hotel={hotel} />
            ))}
            {bottomRowHotels.map((hotel) => (
              <LatestDestinationCard  hotel={hotel} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Hotels */}
      <section className="space-y-12 px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Featured Hotels</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* Luxury Hotels Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md transform transition duration-500 hover:scale-105">
            <a href="https://www.privateupgrades.com/luxury-hotels/asia/india" target="_blank" rel="noopener noreferrer">
              <img src="luxury.jpg" alt="Luxury Hotel" className="w-full h-64 object-cover" />
            </a>
            <div className="p-4 space-y-2">
              <h4 className="text-xl font-semibold text-gray-700">Luxury Hotel</h4>
              <p className="text-gray-500">A luxury experience</p>
              <p className="text-indigo-600 font-bold">₹5000 / night</p>
            </div>
          </div>

          {/* Cozy Hotels Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md transform transition duration-500 hover:scale-105">
            <a href="https://www.i-escape.com/india/boutique-hotels?page=3" target="_blank" rel="noopener noreferrer">
              <img src="COZY.jpg" alt="Cozy Stay" className="w-full h-64 object-cover" />
            </a>
            <div className="p-4 space-y-2">
              <h4 className="text-xl font-semibold text-gray-700">Cozy Stay</h4>
              <p className="text-gray-500">Feel at home</p>
              <p className="text-indigo-600 font-bold">₹3000 / night</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Customer Reviews */}
      <section className="space-y-6 bg-indigo-50 p-8 rounded-lg">
        <h2 className="text-4xl font-extrabold text-indigo-800 text-center">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white shadow-lg rounded-lg p-6 space-y-3">
              <p className="text-gray-700 italic">“{review.message}”</p>
              <div className="text-right text-indigo-600 font-bold">{`- ${review.author}`}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Travel Tips & Guides */}
      <section className="space-y-12 px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Travel Tips & Guides</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* Top 5 Destinations Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
            <img src="destinations.jpg" alt="Top 5 Destinations" className="w-full h-64 object-cover" />
            <div className="p-4 space-y-2">
              <h4 className="text-xl font-semibold text-gray-700">Top 5 Destinations</h4>
              <p className="text-gray-500">Explore the best travel spots...</p>
              <a href="https://www.rattanindia.in/top-5-destinations-leisure-trip" className="text-indigo-600 hover:underline font-medium">Read More →</a>
            </div>
          </div>

          {/* Budget Travel Tips Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
            <img src="budget (1).jpg" alt="Budget Travel Tips" className="w-full h-64 object-cover" />
            <div className="p-4 space-y-2">
              <h4 className="text-xl font-semibold text-gray-700">Budget Travel Tips</h4>
              <p className="text-gray-500">Save more while traveling...</p>
              <a href="https://www.investopedia.com/how-to-travel-on-a-budget-8655623" className="text-indigo-600 hover:underline font-medium">Read More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Newsletter Signup */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold">Stay Updated</h2>
        <p className="text-gray-200">Subscribe to our newsletter for exclusive deals and updates.</p>
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900"
          />
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
