import { useState } from "react";
import { Clock, MapPin, Calendar, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchHistoryItem {
  id: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  filters: {
    certifications: string[];
    priceRange: number[];
    amenities: string[];
  };
  timestamp: string;
  resultsCount: number;
}

const mockSearchHistory: SearchHistoryItem[] = [
  {
    id: "1",
    destination: "Aspen, Colorado",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    filters: {
      certifications: ["Gold"],
      priceRange: [200, 400],
      amenities: ["EV Charging", "Solar Powered"],
    },
    timestamp: "2024-01-25T10:30:00Z",
    resultsCount: 5,
  },
  {
    id: "2",
    destination: "Portland, Oregon",
    checkIn: "2024-03-01",
    checkOut: "2024-03-04",
    filters: {
      certifications: ["Silver", "Verified Green"],
      priceRange: [100, 250],
      amenities: ["Organic Food", "Recycling Program"],
    },
    timestamp: "2024-01-20T14:15:00Z",
    resultsCount: 8,
  },
  {
    id: "3",
    destination: "Burlington, Vermont",
    checkIn: "2024-04-10",
    checkOut: "2024-04-13",
    filters: {
      certifications: [],
      priceRange: [0, 200],
      amenities: ["Bike Rentals"],
    },
    timestamp: "2024-01-18T09:45:00Z",
    resultsCount: 3,
  },
];

export default function SearchHistory() {
  const [searchHistory] = useState<SearchHistoryItem[]>(mockSearchHistory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRerunSearch = (search: SearchHistoryItem) => {
    // In a real app, this would navigate to the search page with the filters applied
    console.log("Re-running search:", search);
    alert(`Re-running search for ${search.destination}`);
  };

  return (
    <div className="min-h-screen nature-gradient py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-eco-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl font-bold">
              <Clock className="h-8 w-8 text-primary" />
              Search History
            </CardTitle>
            <p className="text-muted-foreground">
              View and re-run your previous eco-hotel searches
            </p>
          </CardHeader>
          
          <CardContent>
            {searchHistory.length > 0 ? (
              <div className="space-y-4">
                {searchHistory.map((search) => (
                  <Card key={search.id} className="border border-border hover:shadow-eco transition-eco">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold text-lg">{search.destination}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {formatDate(search.checkIn)} - {formatDate(search.checkOut)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatTimestamp(search.timestamp)}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {search.filters.certifications.length > 0 && (
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium">Certifications:</span>
                                {search.filters.certifications.map((cert) => (
                                  <Badge key={cert} variant="secondary" className="text-xs">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            {search.filters.amenities.length > 0 && (
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium">Amenities:</span>
                                {search.filters.amenities.map((amenity) => (
                                  <Badge key={amenity} variant="outline" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Price Range:</span>
                              <Badge variant="secondary" className="text-xs">
                                ${search.filters.priceRange[0]} - ${search.filters.priceRange[1]}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-sm text-success">
                            Found {search.resultsCount} eco-certified hotels
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => handleRerunSearch(search)}
                            className="eco-gradient text-white hover:opacity-90"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Re-run Search
                          </Button>
                          <span className="text-xs text-muted-foreground text-center">
                            Use same filters
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Search History</h3>
                <p className="text-muted-foreground mb-6">
                  Start searching for eco-certified hotels to build your history.
                </p>
                <Button className="eco-gradient text-white">
                  Start Searching
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}