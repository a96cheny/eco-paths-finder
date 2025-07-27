import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  certifications?: string[];
  priceRange?: [number, number];
  amenities?: string[];
}

interface CertifiedHotel {
  id: string;
  cert_level: 'Gold' | 'Silver' | 'Verified Green';
  description: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get API keys from Supabase secrets
    const tripadvisorApiKey = Deno.env.get('TRIPADVISOR_API_KEY')
    const geocodingApiKey = Deno.env.get('GEOCODING_API_KEY')
    const geocodingProvider = Deno.env.get('GEOCODING_PROVIDER') || 'mapbox'

    if (!tripadvisorApiKey || !geocodingApiKey) {
      throw new Error('API keys not configured in Supabase secrets')
    }

    // Parse request body
    const { destination, checkIn, checkOut, certifications, priceRange, amenities }: SearchParams = await req.json()

    // Initialize Supabase client for database operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Step 1: Geocode destination
    const coordinates = await geocodeDestination(destination, geocodingApiKey, geocodingProvider)
    
    // Step 2: Search TripAdvisor API
    const tripadvisorHotels = await searchTripAdvisor(coordinates, checkIn, checkOut, tripadvisorApiKey)
    
    // Step 3: Get certified hotels from database
    const { data: certifiedHotels, error: dbError } = await supabase
      .from('certified_hotels')
      .select('*')
    
    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    // Step 4: Merge results - only show certified hotels
    const mergedResults = mergeCertifiedHotels(tripadvisorHotels, certifiedHotels)
    
    // Step 5: Apply filters
    const filteredResults = applyFilters(mergedResults, { certifications, priceRange, amenities })

    // Return results as Server-Sent Events stream
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        // Send each hotel as a separate SSE event
        filteredResults.forEach((hotel, index) => {
          const sseData = `data: ${JSON.stringify(hotel)}\n\n`
          controller.enqueue(encoder.encode(sseData))
        })
        
        // Send completion event
        const completeData = `data: {"type": "complete", "total": ${filteredResults.length}}\n\n`
        controller.enqueue(encoder.encode(completeData))
        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Search error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function geocodeDestination(destination: string, apiKey: string, provider: string) {
  let url: string
  
  if (provider === 'mapbox') {
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destination)}.json?access_token=${apiKey}&limit=1`
  } else {
    // API Ninjas
    url = `https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(destination)}`
  }

  const response = await fetch(url, {
    headers: provider === 'api-ninjas' ? { 'X-Api-Key': apiKey } : {}
  })
  
  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.statusText}`)
  }

  const data = await response.json()
  
  if (provider === 'mapbox') {
    if (!data.features || data.features.length === 0) {
      throw new Error('Location not found')
    }
    const [lng, lat] = data.features[0].center
    return { latitude: lat, longitude: lng }
  } else {
    // API Ninjas
    if (!data || data.length === 0) {
      throw new Error('Location not found')
    }
    return { latitude: data[0].latitude, longitude: data[0].longitude }
  }
}

async function searchTripAdvisor(coordinates: {latitude: number, longitude: number}, checkIn: string, checkOut: string, apiKey: string) {
  // Note: Replace with actual TripAdvisor API endpoint when available
  // This is a placeholder structure based on typical hotel search APIs
  const url = `https://api.tripadvisor.com/api/v1/hotels/search`
  
  const searchParams = new URLSearchParams({
    latitude: coordinates.latitude.toString(),
    longitude: coordinates.longitude.toString(),
    checkin: checkIn,
    checkout: checkOut,
    key: apiKey
  })

  const response = await fetch(`${url}?${searchParams}`)
  
  if (!response.ok) {
    throw new Error(`TripAdvisor API error: ${response.statusText}`)
  }

  const data = await response.json()
  
  // Transform TripAdvisor response to our format
  return data.hotels?.map((hotel: any) => ({
    tripadvisorId: hotel.id,
    name: hotel.name,
    location: hotel.location,
    price: hotel.price,
    rating: hotel.rating,
    reviewCount: hotel.review_count,
    imageUrl: hotel.photo?.images?.large?.url,
    // Add other fields as needed
  })) || []
}

function mergeCertifiedHotels(tripadvisorHotels: any[], certifiedHotels: CertifiedHotel[]) {
  return tripadvisorHotels
    .filter(hotel => {
      // Only include hotels that are in our certified list
      return certifiedHotels.some(certified => certified.id === hotel.tripadvisorId)
    })
    .map(hotel => {
      // Add certification info
      const certified = certifiedHotels.find(c => c.id === hotel.tripadvisorId)
      return {
        ...hotel,
        id: hotel.tripadvisorId,
        certification: certified?.cert_level,
        description: certified?.description,
        primaryLocation: hotel.location?.address_obj?.city || '',
        secondaryLocation: hotel.location?.address_obj?.state || hotel.location?.address_obj?.country || ''
      }
    })
}

function applyFilters(hotels: any[], filters: {
  certifications?: string[];
  priceRange?: [number, number];
  amenities?: string[];
}) {
  let filtered = hotels

  if (filters.certifications && filters.certifications.length > 0) {
    filtered = filtered.filter(hotel => 
      filters.certifications!.includes(hotel.certification)
    )
  }

  if (filters.priceRange) {
    filtered = filtered.filter(hotel => 
      hotel.price >= filters.priceRange![0] && hotel.price <= filters.priceRange![1]
    )
  }

  // Add amenities filtering logic here based on your requirements
  
  return filtered
}