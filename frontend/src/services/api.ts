import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  zone?: string;
}

export interface Departure {
  service: string;
  destination: string;
  scheduledTime: string;
  expectedTime: string;
  status: 'On Time' | 'Delayed' | 'Cancelled';
  platform?: string;
  operator: string;
}

export const stopsApi = {
  search: async (query: string): Promise<Stop[]> => {
    const res = await api.get('/stops', { params: { q: query } });
    return res.data.data;
  },
  nearby: async (lat: number, lng: number, radius = 500): Promise<Stop[]> => {
    const res = await api.get('/stops/nearby', { params: { lat, lng, radius } });
    return res.data.data;
  },
};

export const departuresApi = {
  forStop: async (stopId: string): Promise<Departure[]> => {
    const res = await api.get(`/departures/${stopId}`);
    return res.data.data;
  },
};