import { useQuery } from '@tanstack/react-query';
import { departuresApi } from '../services/api';
import type { Departure } from '../services/api';

export function useDepartures(stopId: string | null) {
  return useQuery<Departure[]>({
    queryKey: ['departures', stopId],
    queryFn: () => departuresApi.forStop(stopId!),
    enabled: stopId !== null,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
  });
}