import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  X,
  Zap,
} from "lucide-react";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState("All");
  const [filteredProperties, setFilteredProperties] = useState([]);

  const cardsPerPage = 12;
  const totalPages = Math.ceil(filteredProperties.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredProperties.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const getUniqueCities = () => {
    if (!properties.length) return ["All"];

    const citySet = new Set();

    properties.forEach((obj) => {
      if (obj.displayAddress) {
        const addressParts = obj.displayAddress.split(",");
        if (addressParts.length > 0) {
          const city = addressParts[addressParts.length - 1].trim();
          if (city) citySet.add(city);
        }
      }
    });

    return ["All", ...Array.from(citySet)];
  };

  const cities = getUniqueCities();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/aftab-08khan/UAE_Rental_API/refs/heads/main/uae_properties.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch properties");
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (selectedCity === "All") {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter((property) => {
        if (!property.displayAddress) return false;

        const addressParts = property.displayAddress.split(",");

        // Get the last non-empty part (city)
        const city = addressParts[addressParts.length - 1]?.trim();

        // Compare with selected city (case-insensitive)
        return city?.toLowerCase() === selectedCity.toLowerCase();
      });

      setFilteredProperties(filtered);
    }

    setCurrentPage(1); // Reset to first page when filter changes
  }, [selectedCity, properties]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading premium properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="relative max-w-7xl px-4 py-3 sm:py-5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-yellow-300" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Luxury Properties in UAE
              </h1>
              <Zap className="h-8 w-8 text-yellow-300" />
            </div>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Discover premium homes, apartments, and villas across the Emirates
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-blue-100">
              <MapPin className="h-5 w-5" />
              <span>Dubai • Abu Dhabi • Sharjah • Ajman</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-blue-600">
              {properties.length}
            </div>
            <div className="text-gray-600 mt-1">Total Properties</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-green-600">
              {cities.length - 1}
            </div>
            <div className="text-gray-600 mt-1">Cities</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-purple-600">
              {currentCards.length}
            </div>
            <div className="text-gray-600 mt-1">Showing</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-orange-600">
              {totalPages}
            </div>
            <div className="text-gray-600 mt-1">Pages</div>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Featured Properties
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredProperties.length} found)
              </span>
            </h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-gray-700 font-medium">Filter by</span>
                    <p className="text-xs text-gray-500">
                      Select your preferred city
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none cursor-pointer w-full sm:w-64 hover:border-gray-300 transition-colors"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {selectedCity !== "All" && (
                  <button
                    onClick={() => setSelectedCity("All")}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {cities.slice(0, 6).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCity === city
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {city}
              </button>
            ))}
            {cities.length > 7 && (
              <span className="px-3 py-2 text-gray-500 text-sm">
                +{cities.length - 6} more
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentCards.map((property, index) => (
            <div
              key={`${property.id || property.title}-${index}`}
              className="h-full transform transition-transform duration-300 hover:-translate-y-1"
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-gray-600">
                Showing{" "}
                <span className="font-semibold">{indexOfFirstCard + 1}</span> to{" "}
                <span className="font-semibold">
                  {Math.min(indexOfLastCard, filteredProperties.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold">
                  {filteredProperties.length}
                </span>{" "}
                properties
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-2 text-gray-400">...</span>
                      <button
                        onClick={() => goToPage(totalPages)}
                        className={`w-10 h-10 rounded-lg font-medium ${
                          currentPage === totalPages
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Page Slider */}
            <div className="mt-6">
              <input
                type="range"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Page 1</span>
                <span>Page {currentPage}</span>
                <span>Page {totalPages}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
          <p>
            ✨ Discover your dream home in the UAE's most prestigious locations
          </p>
          <p className="mt-1">
            Properties are updated daily • Verified listings • Premium quality
            only
          </p>
        </div>
      </div>
    </div>
  );
}
