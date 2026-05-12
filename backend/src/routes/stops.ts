import { Router, Request, Response } from 'express';
import { cacheService } from '../cache';
import stopsData from '../data/stops.json';

const router = Router();

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  zone?: string;
}

router.get('/', (_req: Request, res: Response) => {
  const { q } = _req.query;
  const cacheKey = `stops:${q || 'all'}`;

  const cached = cacheService.get<Stop[]>(cacheKey);
  if (cached) {
    return res.json({ source: 'cache', data: cached });
  }

  let results: Stop[] = stopsData as Stop[];

  if (q && typeof q === 'string') {
    const query = q.toLowerCase();
    results = results.filter(stop =>
      stop.name.toLowerCase().includes(query)
    );
  }

  cacheService.set(cacheKey, results, cacheService.TTL.STOPS);
  return res.json({ source: 'static', data: results });
});

router.get('/nearby', (req: Request, res: Response) => {
  const { lat, lng, radius = '500' } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat and lng are required' });
  }

  const userLat = parseFloat(lat as string);
  const userLng = parseFloat(lng as string);
  const radiusMetres = parseFloat(radius as string);

  const nearby = (stopsData as Stop[]).filter(stop => {
    const dist = haversine(userLat, userLng, stop.lat, stop.lng);
    return dist <= radiusMetres;
  });

  return res.json({ data: nearby });
});

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default router;