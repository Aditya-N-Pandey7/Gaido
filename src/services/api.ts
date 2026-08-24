export interface PlanTripRequest {
  query: string;
  destination: string;
  max_crowd: number;
  budget: number;
}

export interface DayItinerary {
  day: number;
  activities: string[];
  safety_score?: number;
}

export interface PlanTripResponse {
  destination: string;
  estimated_cost: number;
  crowd_density_score: number;
  itinerary: DayItinerary[];
  recommendations: string[];
}

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchTripPlan(payload: PlanTripRequest): Promise<PlanTripResponse> {
  const response = await fetch(`${API_BASE_URL}/plan`, {
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
