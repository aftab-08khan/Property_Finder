import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath } from "lucide-react";

export default function PropertyCard({
  image,
  price,
  title,
  displayAddress,
  bedrooms,
  bathrooms,
  rera,
  type,
  addedOn,
  city,
}) {
  /* ------------------ TITLE ------------------ */
  const titleParts = title?.split("|").map((t) => t.trim()) || [];
  const mainTitle = titleParts[0] || "Property Title";
  const tags = titleParts.slice(1);

  /* ------------------ DATE ------------------ */
  const daysAgo = Math.floor(
    (Date.now() - new Date(addedOn)) / (1000 * 60 * 60 * 24)
  );
  const formattedDate = daysAgo <= 0 ? "Today" : `${daysAgo} days ago`;

  /* ------------------ RERA ------------------ */
  const formattedRera = Number.isFinite(rera)
    ? Math.trunc(rera).toString()
    : "N/A";

  /* ------------------ PRICE ------------------ */
  const formattedPrice = price
    ? `AED ${(price / 1_000_000).toFixed(2)}M`
    : "Price on Request";

  return (
    <Card className="group overflow-hidden rounded-2xl h-full border bg-white shadow-sm transition pt-0 hover:shadow-xl flex justify-between flex-col">
      {/* IMAGE */}
      <div className="relative h-50 overflow-hidden">
        <img
          src={image}
          alt={mainTitle}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* TYPE */}
        <Badge className="absolute left-3 top-3 uppercase bg-emerald-600 text-white">
          {type}
        </Badge>

        {/* PRICE */}
        <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-sm font-semibold text-emerald-700">
          {formattedPrice}
        </span>
      </div>

      {/* HEADER */}
      <CardHeader className="space-y-1">
        <h3 className="text-lg font-semibold leading-tight line-clamp-1">
          {mainTitle}
        </h3>

        <p className="flex items-center gap-1 text-sm text-muted-foreground line-clamp-1">
          <MapPin size={14} />
          {displayAddress}
        </p>

        {/* TAGS */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>
      {city && (
        <div className="px-4 mt-3 flex items-center justify-between text-sm text-muted-foreground">
          {/* Left: City */}
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            {city}
          </span>

          {/* Right: Beds & Baths */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Bed size={16} />
              {bedrooms} Beds
            </div>
            <div className="flex items-center gap-1">
              <Bath size={16} />
              {bathrooms} Baths
            </div>
          </div>
        </div>
      )}

      {/* META */}
      <CardContent className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">RERA:</span> {formattedRera}
        </p>
        <p>
          <span className="font-medium">Added:</span> {formattedDate}
        </p>
      </CardContent>

      {/* CTA */}
      <CardFooter className="mt-auto">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
