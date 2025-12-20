import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PropertyCard from "@/components/PropertyCard";
import { Link, useNavigate } from "react-router-dom";

export function CustomCarousel({ properties = [] }) {
  if (!properties.length) return null;
  const navigation = useNavigate();
  const handleNavigation = (link) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigation(link);
  };
  return (
    <div className="relative w-full ">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {properties.map((property) => {
            const city = property.displayAddress
              ?.split(",")
              .pop()
              ?.trim()
              .toLowerCase();

            return (
              <CarouselItem
                key={property.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className="p-2 h-full"
                  onClick={() => handleNavigation(`/${city}/${property.id}`)}
                >
                  <PropertyCard {...property} city={city} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="left-[-12px]" />
        <CarouselNext className="right-[-12px]" />
      </Carousel>
    </div>
  );
}
