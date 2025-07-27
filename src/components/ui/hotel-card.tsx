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
    <Card className="shadow-eco-card hover:shadow-eco-modal transition-eco group">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-eco">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {primaryLocation}, {secondaryLocation}
              </span>
            </div>
          </div>
          <Badge className={`${getCertificationClass(certification)} px-3 py-1 font-medium`}>
            <CheckCircle className="h-3 w-3 mr-1" />
            {certification}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
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
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${price}
            </div>
            <div className="text-xs text-muted-foreground">per night</div>
          </div>
        </div>
        
        <Button 
          onClick={handleBookClick}
          className="w-full mt-4 eco-gradient text-white hover:opacity-90"
        >
          Book on TripAdvisor
        </Button>
      </CardContent>
    </Card>
  );
}