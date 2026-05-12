import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Stop } from './services/api';
import { StopSearch } from './components/StopSearch';
import { DepartureBoard } from './components/DepartureBoard';
import { StopMap } from './components/StopMap';
import { FavouriteStops } from './components/FavouriteStops';
import allStops from './data/stops.json';
import './index.css';

const queryClient = new QueryClient();

function BusTracker() {
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <header className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚌</span>
          <div>
            <h1 className="font-bold text-lg leading-none">NI Bus Tracker</h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
              Translink real-time departures
            </p>
          </div>
        </div>
        <div className="text-xs px-2 py-1 rounded-full"
          style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid var(--color-accent)' }}>
          Northern Ireland
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <StopSearch onSelectStop={setSelectedStop} selectedStop={selectedStop} />
          <FavouriteStops selectedStop={selectedStop} onSelectStop={setSelectedStop} />
          <DepartureBoard stop={selectedStop} />
        </div>

        <div className="lg:col-span-2">
          <StopMap
            stops={allStops as Stop[]}
            selectedStop={selectedStop}
            onSelectStop={setSelectedStop}
          />
          {selectedStop && (
            <p className="text-xs mt-2 text-center" style={{ color: 'var(--color-muted)' }}>
              Viewing: {selectedStop.name} · Click any marker to select a stop
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BusTracker />
    </QueryClientProvider>
  );
}