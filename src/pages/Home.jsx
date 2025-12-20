import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { cities } from "../../defaults/utlis";
import { useTheme } from "../../context/themeContext";
import ContentWrapper from "../components/ContentWrapper";
import HeaderImageSlider from "../components/HeaderImageSlider";
import HomeHeader from "../components/HomeHeader";
import TopHeader from "../components/TopHeader";

export default function Home() {
  const { properties, loading, error } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 12;
  const totalPages = Math.ceil(properties.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = properties.slice(indexOfFirstCard, indexOfLastCard);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

      <ContentWrapper>
        <div className="min-h-screen pt-6 bg-gray-50">
          <div className="relative">
            <HeaderImageSlider />
            <HomeHeader />
          </div>
          <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {currentCards.map((property, index) => {
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
                        {Math.min(indexOfLastCard, properties.length)}
                      </span>{" "}
                      (
                      {Math.min(indexOfLastCard, properties.length) -
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

          <Footer />
        </div>
      </ContentWrapper>
    </>
  );
}
