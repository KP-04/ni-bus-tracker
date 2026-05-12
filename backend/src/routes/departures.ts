import { Router, Request, Response } from 'express';
import { cacheService } from '../cache';

const router = Router();

export interface Departure {
  service: string;
  destination: string;
  scheduledTime: string;
  expectedTime: string;
  status: 'On Time' | 'Delayed' | 'Cancelled';
  platform?: string;
  operator: string;
}

router.get('/:stopId', async (req: Request, res: Response) => {
  const stopId = req.params.stopId as string;
  const cacheKey = `departures:${stopId}`;

  const cached = cacheService.get<Departure[]>(cacheKey);
  if (cached) {
    return res.json({ source: 'cache', data: cached });
  }

  const departures = getMockDepartures(stopId);
  cacheService.set(cacheKey, departures, cacheService.TTL.DEPARTURES);
  return res.json({ source: 'mock', data: departures });
});

function getMockDepartures(_stopId: string): Departure[] {
  const now = new Date();
  const addMins = (mins: number) => {
    const d = new Date(now.getTime() + mins * 60000);
    return d.toTimeString().slice(0, 5);
  };

  return [
    { service: '1A', destination: 'Belfast City Centre', scheduledTime: addMins(3), expectedTime: addMins(3), status: 'On Time', platform: '1', operator: 'Translink Metro' },
    { service: '2B', destination: 'Lisburn', scheduledTime: addMins(8), expectedTime: addMins(11), status: 'Delayed', platform: '2', operator: 'Translink Metro' },
    { service: '8', destination: 'Dundonald', scheduledTime: addMins(15), expectedTime: addMins(15), status: 'On Time', operator: 'Translink Metro' },
    { service: 'Express 212', destination: 'Newry', scheduledTime: addMins(22), expectedTime: addMins(22), status: 'On Time', platform: '3', operator: 'Translink Goldline' },
    { service: '5A', destination: 'Newtownabbey', scheduledTime: addMins(30), expectedTime: addMins(30), status: 'On Time', operator: 'Translink Metro' },
  ];
}

export default router;