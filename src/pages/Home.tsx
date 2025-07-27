import { useState } from "react";
import { Filter } from "lucide-react";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { WhyEcoTravel } from "@/components/ui/why-eco-travel";
import { HotelCard } from "@/components/ui/hotel-card";
import { FilterSidebar } from "@/components/ui/filter-sidebar";
import { RedirectModal } from "@/components/ui/redirect-modal";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ApiConfig } from "@/components/ui/api-config";
import { useHotelSearch } from "@/hooks/useHotelSearch";
import { useToast } from "@/hooks/use-toast";

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
  const { results, loading, error, searchHotels } = useHotelSearch();
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const [redirectModal, setRedirectModal] = useState<{
    isOpen: boolean;
    hotel: any;
  }>({ isOpen: false, hotel: null });
  const [hasSearched, setHasSearched] = useState(false);
  const [apiConfig, setApiConfig] = useState<any>(null);

  const handleSearch = async (searchData: any) => {
    if (!apiConfig) {
      toast({
        title: "API Configuration Required",
        description: "Please configure your API keys first using the settings button.",
        variant: "destructive"
      });
      return;
    }

    setHasSearched(true);
    await searchHotels(searchData);
  };

  const handleFiltersChange = async (filters: any) => {
    if (hasSearched) {
      // Re-search with filters applied
      const lastSearch = {
        destination: "Current Search", // You'd store this from the last search
        checkIn: new Date().toISOString().split('T')[0],
        checkOut: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
      };
      await searchHotels(lastSearch, filters);
    }
  };

  const handleApiConfigSave = (config: any) => {
    setApiConfig(config);
    toast({
      title: "API Configuration Saved",
      description: "Your API keys have been configured. You can now search for hotels.",
    });
  };

  const handleBookClick = (hotel: any) => {
    setRedirectModal({ isOpen: true, hotel });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* API Configuration */}
      <ApiConfig onConfigSave={handleApiConfigSave} />
      
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />
      
      {/* Why Eco Travel Section */}
      {!hasSearched && <WhyEcoTravel />}

      {/* Results Section */}
      {hasSearched && (
        <section className="py-16 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Eco-Certified Hotels ({results.length} found)
                {loading && <span className="text-sm font-normal text-muted-foreground ml-2">Searching...</span>}
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
                {error && (
                  <div className="text-center py-16">
                    <p className="text-xl text-destructive mb-2">Search Error</p>
                    <p className="text-muted-foreground">{error}</p>
                  </div>
                )}
                
                {loading && (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Searching certified eco-hotels...</p>
                  </div>
                )}
                
                {!loading && !error && results.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {results.map((hotel) => (
                      <HotelCard
                        key={hotel.id}
                        {...hotel}
                        onBookClick={handleBookClick}
                      />
                    ))}
                  </div>
                )}
                
                {!loading && !error && hasSearched && results.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground">
                      No certified eco-hotels found for your search.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your destination or dates, or check if your API keys are configured correctly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />

      {/* Redirect Modal */}
      <RedirectModal
        isOpen={redirectModal.isOpen}
        onClose={() => setRedirectModal({ isOpen: false, hotel: null })}
        hotel={redirectModal.hotel}
      />
    </div>
  );
}