import { useParams, Link } from "react-router-dom";
import { MapPin, Bed, Bath, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../context/themeContext";
import ContentWrapper from "../components/ContentWrapper";
import { CustomCarousel } from "../components/CustomCarousel";

const SingleProfile = () => {
  const { city, id } = useParams();
  const { getPropertyById, getPropertiesByCity, loading } = useTheme();

  const property = getPropertyById(id);
  const relatedProperties = getPropertiesByCity(city, 8);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Property not found</p>
      </div>
    );
  }

  const {
    image,
    title,
    price,
    displayAddress,
    bedrooms,
    bathrooms,
    rera,
    type,
    addedOn,
  } = property;
  const tags = title.split("|").slice(1, title.length);

  const formattedPrice = `AED ${(price / 1_000_000).toFixed(2)}M`;
  const formattedRera = Math.trunc(rera);

  return (
    <ContentWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* BACK */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600"
          >
            <ArrowLeft size={16} /> Back to listings
          </Link>
        </div>

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="relative rounded-3xl overflow-hidden h-[420px] shadow-lg">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />

            <Badge className="absolute top-5 left-5 bg-emerald-600 text-white uppercase">
              {type}
            </Badge>

            <div className="absolute bottom-5 right-5 bg-white/90 px-4 py-2 rounded-xl text-lg font-semibold text-emerald-700">
              {formattedPrice}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {title.split("|")[0]}
              </h1>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 my-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1 text-md font-medium rounded-full bg-green-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  displayAddress
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 mt-2 hover:text-emerald-600 transition"
              >
                <MapPin size={16} />
                {displayAddress}
              </a>
            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-6 bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center gap-2 text-gray-700">
                <Bed size={18} /> {bedrooms} Bedrooms
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Bath size={18} /> {bathrooms} Bathrooms
              </div>
              <div className="text-gray-700">
                <span className="font-medium">RERA:</span> {formattedRera}
              </div>
              <div className="text-gray-700 capitalize">
                <span className="font-medium">City:</span> {city}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">
                Property Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Experience premium living in one of Dubai’s most desirable
                communities. This property offers spacious interiors, modern
                design, and world-class amenities—perfect for luxury living or
                investment.
              </p>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Interested?
              </h3>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Contact Agent
              </Button>

              <Button variant="outline" className="w-full mt-3">
                Schedule Viewing
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border text-sm text-gray-600">
              <p>
                <span className="font-medium">Added on:</span>{" "}
                {new Date(addedOn).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
        {relatedProperties.length > 0 && (
          <div className="w-full mb-20">
            <h2 className="text-2xl font-semibold mb-6">
              Similar properties in {city}
            </h2>

            <CustomCarousel properties={relatedProperties} />
          </div>
        )}
      </div>
    </ContentWrapper>
  );
};

export default SingleProfile;
