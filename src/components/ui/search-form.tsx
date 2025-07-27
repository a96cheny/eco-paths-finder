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
    <Card className="w-full max-w-4xl shadow-eco-modal bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

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
            className="w-full h-14 text-lg font-semibold eco-gradient text-white hover:opacity-90 transition-eco rounded-xl shadow-eco-card"
          >
            <Search className="h-5 w-5 mr-2" />
            Search Hotels
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}