import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square } from "lucide-react";

export default function PropertyCard({
  image,
  price,
  title,
  location,
  beds,
  baths,
  area,
  type,
}) {
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Property Type */}
        <Badge className="absolute left-3 top-3 bg-emerald-600 text-white">
          {type}
        </Badge>

        {/* Price */}
        <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-sm font-semibold text-emerald-600">
          {price}
        </span>
      </div>

      {/* Title & Location */}
      <CardHeader className="space-y-1">
        <h3 className="text-lg font-semibold leading-tight line-clamp-1">
          {title}
        </h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={14} />
          {location}
        </p>
      </CardHeader>

      {/* Features */}
      <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Bed size={16} /> {beds} Beds
        </div>
        <div className="flex items-center gap-1">
          <Bath size={16} /> {baths} Baths
        </div>
        <div className="flex items-center gap-1">
          <Square size={16} /> {area}
        </div>
      </CardContent>

      {/* CTA */}
      <CardFooter>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
