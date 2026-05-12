import { useQuery } from '@tanstack/react-query';
import { stopsApi } from '../services/api';
import type { Stop } from '../services/api';

export function useStopSearch(query: string) {
  return useQuery<Stop[]>({
    queryKey: ['stops', 'search', query],
    queryFn: () => stopsApi.search(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function useNearbyStops(lat: number | null, lng: number | null) {
  return useQuery<Stop[]>({
    queryKey: ['stops', 'nearby', lat, lng],
    queryFn: () => stopsApi.nearby(lat!, lng!),
    enabled: lat !== null && lng !== null,
    staleTime: 1000 * 60 * 5,
  });
}