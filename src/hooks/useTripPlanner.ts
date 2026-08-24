import { useState } from 'react';
import { fetchTripPlan, PlanTripRequest, PlanTripResponse, DayItinerary } from '../services/api';

function sanitizeResponse(result: any, fallbackDestination: string, fallbackBudget: number): PlanTripResponse {
  const dest = result && typeof result.destination === 'string' && result.destination
    ? result.destination
    : fallbackDestination;

  // Capitalize destination to match DESTINATION_IMAGES keys (e.g. "goa" -> "Goa")
  const capitalizedDest = dest.charAt(0).toUpperCase() + dest.slice(1).toLowerCase();

  const cost = result && typeof result.estimated_cost === 'number'
    ? result.estimated_cost
    : (result && !isNaN(Number(result.estimated_cost)) ? Number(result.estimated_cost) : fallbackBudget);

  const crowd = result && typeof result.crowd_density_score === 'number'
    ? result.crowd_density_score
    : (result && typeof result.crowd_score === 'number' ? result.crowd_score : 25);

  let rawItinerary = result?.itinerary;
  let cleanItinerary: DayItinerary[] = [];

  if (Array.isArray(rawItinerary)) {
    cleanItinerary = rawItinerary.map((item: any, idx: number) => {
      if (typeof item === 'string') {
        return {
          day: idx + 1,
          activities: [item]
        };
      }
      
      const dayNum = item && typeof item.day === 'number' ? item.day : (idx + 1);
      
      let activities: string[] = [];
      if (item && Array.isArray(item.activities)) {
        activities = item.activities.filter((act: any) => typeof act === 'string');
      } else if (item && typeof item.activities === 'string') {
        activities = [item.activities];
      } else if (item && typeof item.activity === 'string') {
        activities = [item.activity];
      } else {
        activities = ["Explore local spots"];
      }

      return {
        day: dayNum,
        activities
      };
    });
  } else {
    // If itinerary is missing or not an array, check itinerary_highlights
    let highlights = result?.itinerary_highlights;
    if (!Array.isArray(highlights)) {
      highlights = ["Explore key tourist points", "Visit local market", "Relax and sightsee"];
    }
    cleanItinerary = highlights.map((highlight: any, idx: number) => ({
      day: idx + 1,
      activities: [String(highlight)]
    }));
  }

  return {
    destination: capitalizedDest,
    estimated_cost: cost,
    crowd_density_score: crowd,
    itinerary: cleanItinerary
  };
}

export function useTripPlanner() {
  const [data, setData] = useState<PlanTripResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async (payload: PlanTripRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTripPlan(payload);
      const sanitized = sanitizeResponse(result, payload.destination, payload.budget);
      setData(sanitized);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while communicating with Gaido AI backend.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, generatePlan };
}
