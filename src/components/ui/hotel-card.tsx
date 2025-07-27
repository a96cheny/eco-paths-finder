import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card, CardContent, CardHeader } from "./card";

interface HotelCardProps {
  id: string;
  name: string;
  primaryLocation: string;
  secondaryLocation: string;
  certification: "Gold" | "Silver" | "Verified Green";
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  onBookClick: (hotel: any) => void;
}

const getCertificationClass = (certification: string) => {
  switch (certification) {
    case "Gold":
      return "certification-gold";
    case "Silver":
      return "certification-silver";
    default:
      return "certification-green";
  }
};

export function HotelCard({
  id,
  name,
  primaryLocation,
  secondaryLocation,
  certification,
  description,
  price,
  rating,
  reviewCount,
  onBookClick,
}: HotelCardProps) {
  const handleBookClick = () => {
    onBookClick({
      id,
      name,
      certification,
      price,
    });
  };

  return (
    <Card className="shadow-eco-card hover:shadow-eco-modal transition-eco group rounded-xl overflow-hidden bg-white">
      <div className="flex flex-col h-full">
        {/* Image placeholder */}
        <div className="h-48 bg-muted/50 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Hotel Image</div>
        </div>
        
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-eco">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  {primaryLocation}, {secondaryLocation}
                </span>
              </div>
            </div>
            <Badge className={`${getCertificationClass(certification)} px-3 py-1 font-medium rounded-full`}>
              <CheckCircle className="h-3 w-3 mr-1" />
              {certification}
            </Badge>
          </div>
        </CardHeader>
      
        <CardContent className="pt-0 flex-1 flex flex-col">
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 italic leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-warning text-warning"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({reviewCount} reviews)
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                ${price}
              </div>
              <div className="text-sm text-muted-foreground">per night</div>
            </div>
          </div>
          
          <div className="mt-auto">
            <Button 
              onClick={handleBookClick}
              className="w-full eco-gradient text-white hover:opacity-90 font-semibold py-3 rounded-lg"
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}