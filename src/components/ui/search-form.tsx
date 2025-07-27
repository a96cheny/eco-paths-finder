import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent } from "./card";
import { Label } from "./label";

interface SearchFormProps {
  onSearch: (searchData: {
    destination: string;
    checkIn: string;
    checkOut: string;
  }) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && checkIn && checkOut) {
      onSearch({ destination, checkIn, checkOut });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-4xl shadow-eco-card">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Find Eco-Certified Hotels
            </h2>
            <p className="text-muted-foreground">
              Discover sustainable accommodations for conscious travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm font-medium">
                Destination
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="destination"
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="check-in" className="text-sm font-medium">
                Check-in
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10"
                  min={today}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="check-out" className="text-sm font-medium">
                Check-out
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10"
                  min={checkIn || today}
                  required
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg eco-gradient text-white hover:opacity-90 transition-eco"
          >
            <Search className="h-5 w-5 mr-2" />
            Search Hotels
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}