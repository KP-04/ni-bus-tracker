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
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--color-bg)' }}>

      {/* Full screen map */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <StopMap
          stops={allStops as Stop[]}
          selectedStop={selectedStop}
          onSelectStop={(stop) => { setSelectedStop(stop); setPanelOpen(true); }}
        />
      </div>

      {/* Header bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 17, 23, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        zIndex: 1000,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🚌</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '16px', lineHeight: 1 }}>NI Bus Tracker</div>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>Translink real-time departures</div>
          </div>
        </div>
        <div style={{
          fontSize: '11px',
          padding: '4px 10px',
          borderRadius: '999px',
          background: 'var(--color-accent-dim)',
          color: 'var(--color-accent)',
          border: '1px solid var(--color-accent)',
        }}>
          Northern Ireland
        </div>
      </div>

      {/* Side panel */}
      <div style={{
        position: 'absolute',
        top: '70px',
        left: panelOpen ? '16px' : '-340px',
        width: '320px',
        maxHeight: 'calc(100vh - 90px)',
        overflowY: 'auto',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'left 0.3s ease',
        paddingBottom: '16px',
        background: 'rgba(15, 17, 23, 0.85)',
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        padding: '12px',
      }}>
        <StopSearch onSelectStop={(stop) => { setSelectedStop(stop); setPanelOpen(true); }} selectedStop={selectedStop} />
        <FavouriteStops selectedStop={selectedStop} onSelectStop={(stop) => { setSelectedStop(stop); setPanelOpen(true); }} />
        <DepartureBoard stop={selectedStop} />
      </div>

      {/* Toggle panel button */}
      <button
        onClick={() => setPanelOpen(p => !p)}
        style={{
          position: 'absolute',
          top: '70px',
          left: panelOpen ? '348px' : '16px',
          zIndex: 1000,
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'rgba(15, 17, 23, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          transition: 'left 0.3s ease',
        }}
      >
        {panelOpen ? '◀' : '▶'}
      </button>

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