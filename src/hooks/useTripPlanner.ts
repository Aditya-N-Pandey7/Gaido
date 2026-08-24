import { useState } from 'react';
import { fetchTripPlan, PlanTripRequest, PlanTripResponse } from '../services/api';

export function useTripPlanner() {
  const [data, setData] = useState<PlanTripResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async (payload: PlanTripRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTripPlan(payload);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while communicating with Gaido AI backend.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, generatePlan };
}
