import NodeCache from 'node-cache';

const TTL = {
  STOPS: 86400,
  DEPARTURES: 30,
  JOURNEYS: 300,
  INCIDENTS: 300,
};

const cache = new NodeCache({ stdTTL: TTL.STOPS });

export const cacheService = {
  get: <T>(key: string): T | undefined => {
    return cache.get<T>(key);
  },
  set: <T>(key: string, value: T, ttl: number): void => {
    cache.set(key, value, ttl);
  },
  TTL,
};