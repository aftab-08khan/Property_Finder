import { useEffect, useRef, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { bathrooms, cities, quickFilter, status } from "../../defaults/utlis";
import { useTheme } from "../../context/themeContext";
import ContentWrapper from "../components/ContentWrapper";
import HeaderImageSlider from "../components/HeaderImageSlider";
import HomeHeader from "../components/HomeHeader";
import TopHeader from "../components/TopHeader";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
export default function Home() {
  const {
    properties,
    loading,
    error,
    filteredProperties,
    setFilteredProperties,
  } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);
  const [selectedBathroom, setSelectedBathroom] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleScroll = () => {
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const cardsPerPage = 8;
  const totalPages = Math.ceil(filteredProperties.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredProperties.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const filteredData = properties.filter((property) => {
      const bathroomsMatch =
        !selectedBathroom ||
        Number(property?.bathrooms) === Number(selectedBathroom);

      const cityMatch =
        !selectedCity ||
        property?.displayAddress
          ?.toLowerCase()
          .includes(selectedCity.toLowerCase());

      return bathroomsMatch && cityMatch;
    });

    setFilteredProperties(filteredData);
    handleScroll();
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin" />
          <p className="text-gray-600 font-medium">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <TopHeader />
      <div className="relative h-full">
        <div className="relative z-10 flex flex-col justify-center">
          <div className="max-w-7xl px-4 py-12 md:py-16 mx-auto">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                Find Your <span className="text-green-400">Perfect</span> Home
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover thousands of properties for sale and rent across the
                country. Your dream property is just a search away.
              </p>

              <form
                action="#"
                onSubmit={handleFormSubmit}
                className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-2 md:p-4"
              >
                <div className="flex flex-col md:flex-row gap-2 md:gap-0">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        onChange={(e) => setSelectedCity(e.target.value)}
                        type="text"
                        value={selectedCity}
                        placeholder="Enter city, neighborhood, or ZIP"
                        className="w-full pl-10 pr-4 py-3 border-0 focus:ring-0 focus:outline-none rounded-lg md:rounded-l-lg md:rounded-r-none"
                      />
                    </div>
                  </div>

                  <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200">
                    <select
                      className="w-full px-4 py-3 border-0 focus:ring-0 focus:outline-none bg-transparent"
                      onChange={(e) => setSelectedBathroom(e.target.value)}
                    >
                      <option value="All">No. of Bathroom</option>
                      {bathrooms.map((bathroom) => {
                        return (
                          <option value={bathroom} key={bathroom}>
                            {bathroom}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg md:rounded-r-lg md:rounded-l-none transition duration-200 mt-2 md:mt-0">
                    Search
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {quickFilter.map((name) => {
                    return (
                      <button
                        key={name}
                        className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition"
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </form>

              <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-8 mt-12">
                {status.map((st) => (
                  <div
                    key={st.value}
                    className="text-center bg-green-200 px-8 py-2 rounded-lg"
                  >
                    <div className="text-3xl font-bold text-green-700">
                      {st.value}
                    </div>
                    <div className="text-gray-600">{st.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContentWrapper>
        <div className="min-h-screen bg-gray-50 w-full">
          {/* <div className="relative">
            <HeaderImageSlider />
            <HomeHeader />
          </div> */}

          <div className="mx-auto max-w-7xl px-4 py-10" ref={sectionRef}>
            <h1 className=" text-4xl py-8 font-bold text-green-800 tracking-wide">
              Explore Properties
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {currentCards.length > 0 &&
                currentCards.map((property, index) => {
                  const cityName = cities.find((city) =>
                    property.displayAddress
                      ?.split(",")
                      .map((part) => part.trim().toLowerCase())
                      .includes(city.toLowerCase())
                  );

                  return (
                    <Link
                      key={property.id}
                      to={`/${cityName.toLowerCase()}/${property.id}`}
                    >
                      <PropertyCard {...property} city={cityName} />
                    </Link>
                  );
                })}
            </div>
            {currentCards?.length === 0 && (
              <p className="text-red-500 text-center text-xl tracking-wide">
                No Results Found Please Change the Selection....
              </p>
            )}

            {totalPages > 1 && (
              <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Responsive Info */}
                  <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                    <div>
                      Page <span className="font-semibold">{currentPage}</span>{" "}
                      of <span className="font-semibold">{totalPages}</span>
                    </div>
                    <div className="text-xs sm:text-sm">
                      Showing{" "}
                      <span className="font-semibold">
                        {indexOfFirstCard + 1}
                      </span>{" "}
                      –{" "}
                      <span className="font-semibold">
                        {Math.min(indexOfLastCard, filteredProperties.length)}
                      </span>{" "}
                      (
                      {Math.min(indexOfLastCard, filteredProperties.length) -
                        indexOfFirstCard}{" "}
                      items)
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Prev
                    </button>

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
