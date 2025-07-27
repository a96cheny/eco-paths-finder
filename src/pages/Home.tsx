import { useState } from "react";
import { Filter } from "lucide-react";
import { SearchForm } from "@/components/ui/search-form";
import { HotelCard } from "@/components/ui/hotel-card";
import { FilterSidebar } from "@/components/ui/filter-sidebar";
import { RedirectModal } from "@/components/ui/redirect-modal";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-eco-travel.jpg";

// Mock hotel data
const mockHotels = [
  {
    id: "1",
    name: "EcoLodge Mountain Retreat",
    primaryLocation: "Aspen",
    secondaryLocation: "Colorado",
    certification: "Gold" as const,
    description: "Luxury eco-lodge powered entirely by renewable energy, featuring locally sourced organic dining and carbon-neutral operations.",
    price: 289,
    rating: 4.8,
    reviewCount: 342,
  },
  {
    id: "2",
    name: "Green Haven Resort",
    primaryLocation: "Portland",
    secondaryLocation: "Oregon",
    certification: "Silver" as const,
    description: "Sustainable resort with rainwater harvesting, organic gardens, and comprehensive recycling programs.",
    price: 195,
    rating: 4.5,
    reviewCount: 156,
  },
  {
    id: "3",
    name: "Nature's Rest Inn",
    primaryLocation: "Burlington",
    secondaryLocation: "Vermont",
    certification: "Verified Green" as const,
    description: "Charming inn committed to environmental stewardship with solar heating and local farm partnerships.",
    price: 145,
    rating: 4.3,
    reviewCount: 89,
  },
];

export default function Home() {
  const [searchResults, setSearchResults] = useState<typeof mockHotels>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [redirectModal, setRedirectModal] = useState<{
    isOpen: boolean;
    hotel: any;
  }>({ isOpen: false, hotel: null });
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (searchData: any) => {
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockHotels);
      setHasSearched(true);
    }, 1000);
  };

  const handleFiltersChange = (filters: any) => {
    // Apply filters to search results
    let filtered = mockHotels;
    
    if (filters.certifications.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.certifications.includes(hotel.certification)
      );
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(hotel => 
        hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
      );
    }
    
    setSearchResults(filtered);
  };

  const handleBookClick = (hotel: any) => {
    setRedirectModal({ isOpen: true, hotel });
  };

  return (
    <div className="min-h-screen nature-gradient">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              EcoTravel
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2">
              by National Geographic
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover certified sustainable hotels that care for our planet
            </p>
          </div>
          
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Eco-Certified Hotels ({searchResults.length} found)
              </h2>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex gap-8">
              {/* Desktop Filters */}
              <div className="hidden md:block w-80 flex-shrink-0">
                <FilterSidebar
                  isOpen={true}
                  onClose={() => {}}
                  onFiltersChange={handleFiltersChange}
                />
              </div>

              {/* Mobile Filters */}
              <FilterSidebar
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                onFiltersChange={handleFiltersChange}
              />

              {/* Results Grid */}
              <div className="flex-1">
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {searchResults.map((hotel) => (
                      <HotelCard
                        key={hotel.id}
                        {...hotel}
                        onBookClick={handleBookClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground">
                      No hotels match your current filters.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your criteria to see more results.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Redirect Modal */}
      <RedirectModal
        isOpen={redirectModal.isOpen}
        onClose={() => setRedirectModal({ isOpen: false, hotel: null })}
        hotel={redirectModal.hotel}
      />
    </div>
  );
}