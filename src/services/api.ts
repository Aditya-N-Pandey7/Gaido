export interface PlanTripRequest {
  query: string;
  destination: string;
  max_crowd: number;
  budget: number;
}

export interface DayItinerary {
  day: number;
  activities: string[];
}

export interface BudgetBreakdown {
  stay: number;
  travelling: number;
  emergency_fund: number;
  total: number;
}

export interface PlanTripResponse {
  destination: string;
  estimated_cost: number;
  crowd_density_score: number;
  itinerary: DayItinerary[];
  recommendations?: string[];
  budget_breakdown?: BudgetBreakdown;
}

export interface DestinationMeta {
  image: string;
  country: string;
  category: string;
  tag: string;
  price: string;
  rating: number;
  reviews: string;
  days: string;
  description: string;
  badges: string[];
}

export const DESTINATION_IMAGES: Record<string, DestinationMeta> = {
  Goa: {
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    country: 'India',
    category: 'BEACH & COASTAL',
    tag: 'BEACH',
    price: '₹15,000',
    rating: 4.8,
    reviews: '3,210',
    days: '3-5 days',
    description: 'Sun-kissed beaches, Portuguese heritage & calm coastal vibes',
    badges: ['BEACHES', 'NIGHTLIFE', 'WATER SPORTS'],
  },
  Jaipur: {
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    country: 'India',
    category: 'ROYAL HERITAGE',
    tag: 'CULTURE',
    price: '₹18,000',
    rating: 4.9,
    reviews: '4,520',
    days: '4-6 days',
    description: 'The Pink City of grand palaces, hill forts & vibrant bazaars',
    badges: ['PALACES', 'FORTS', 'BAZAARS'],
  },
  Manali: {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    country: 'India',
    category: 'HIMALAYAN ADVENTURE',
    tag: 'ADVENTURE',
    price: '₹22,000',
    rating: 4.9,
    reviews: '5,100',
    days: '5-7 days',
    description: 'Snow-capped peaks, Solang Valley sports & serene pine forests',
    badges: ['MOUNTAINS', 'SNOW', 'TREKKING'],
  },
  Munnar: {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    country: 'India',
    category: 'TEA GARDENS',
    tag: 'NATURE',
    price: '₹14,000',
    rating: 4.8,
    reviews: '2,890',
    days: '3-4 days',
    description: 'Rolling green tea plantations & cool mist-covered hills',
    badges: ['TEA ESTATES', 'MIST', 'WATERFALLS'],
  },
  Varanasi: {
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    country: 'India',
    category: 'SPIRITUAL & ANCIENT',
    tag: 'SPIRITUAL',
    price: '₹12,000',
    rating: 4.7,
    reviews: '6,400',
    days: '3-5 days',
    description: 'Sacred Ganges ghats, evening Aarti & spiritual heritage',
    badges: ['GHATS', 'TEMPLES', 'GANGA ARTI'],
  },
};

const API_BASE_URL = 'http://127.0.0.1:8000';

export async function fetchTripPlan(payload: PlanTripRequest): Promise<PlanTripResponse> {
  const response = await fetch(`${API_BASE_URL}/api/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Server returned ${response.status}: ${errorText || 'Failed to fetch trip plan'}`);
  }

  return response.json();
}
