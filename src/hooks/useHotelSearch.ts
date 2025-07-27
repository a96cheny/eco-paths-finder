import { useState, useCallback } from 'react';

interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
}

interface CertifiedHotel {
  id: string;
  name: string;
  primaryLocation: string;
  secondaryLocation: string;
  certification: 'Gold' | 'Silver' | 'Verified Green';
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  tripadvisorId: string;
}

interface FilterOptions {
  certifications: string[];
  priceRange: [number, number];
  amenities: string[];
}

export function useHotelSearch() {
  const [results, setResults] = useState<CertifiedHotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchHotels = useCallback(async (
    searchParams: SearchParams,
    filters: FilterOptions = { certifications: [], priceRange: [0, 1000], amenities: [] }
  ) => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      // For now, use mock data since backend isn't connected
      // In production, this would call your search_hotels.php endpoint
      const mockResults = await simulateAPICall(searchParams, filters);
      setResults(mockResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    loading,
    error,
    searchHotels
  };
}

// Mock function - replace with actual API call when backend is ready
async function simulateAPICall(
  searchParams: SearchParams, 
  filters: FilterOptions
): Promise<CertifiedHotel[]> {
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock certified hotels data
  const mockHotels: CertifiedHotel[] = [
    {
      id: "1",
      name: "EcoLodge Mountain Retreat",
      primaryLocation: searchParams.destination || "Aspen",
      secondaryLocation: "Colorado",
      certification: "Gold",
      description: "Luxury eco-lodge powered entirely by renewable energy, featuring locally sourced organic dining and carbon-neutral operations.",
      price: 289,
      rating: 4.8,
      reviewCount: 342,
      tripadvisorId: "123456",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"
    },
    {
      id: "2", 
      name: "Green Haven Resort",
      primaryLocation: searchParams.destination || "Portland",
      secondaryLocation: "Oregon",
      certification: "Silver",
      description: "Sustainable resort with rainwater harvesting, organic gardens, and comprehensive recycling programs.",
      price: 195,
      rating: 4.5,
      reviewCount: 156,
      tripadvisorId: "789012",
      imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400"
    },
    {
      id: "3",
      name: "Nature's Rest Inn", 
      primaryLocation: searchParams.destination || "Burlington",
      secondaryLocation: "Vermont",
      certification: "Verified Green",
      description: "Charming inn committed to environmental stewardship with solar heating and local farm partnerships.",
      price: 145,
      rating: 4.3,
      reviewCount: 89,
      tripadvisorId: "345678",
      imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400"
    }
  ];

  // Apply filters
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

  return filtered;
}