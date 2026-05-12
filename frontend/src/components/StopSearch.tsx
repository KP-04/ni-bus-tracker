import { useState } from 'react';
import { useStopSearch } from '../hooks/useStops';
import type { Stop } from '../services/api';

interface Props {
  onSelectStop: (stop: Stop) => void;
  selectedStop: Stop | null;
}

export function StopSearch({ onSelectStop, selectedStop }: Props) {
  const [query, setQuery] = useState('');
  const { data: stops, isLoading } = useStopSearch(query);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a bus stop..."
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
        />
        {isLoading && (
          <div className="absolute right-3 top-3.5">
            <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
          </div>
        )}
      </div>

      {stops && stops.length > 0 && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden shadow-2xl"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          {stops.slice(0, 6).map(stop => (
            <button
              key={stop.id}
              onClick={() => { onSelectStop(stop); setQuery(''); }}
              className="w-full text-left px-4 py-3 text-sm transition-colors hover:opacity-80 flex items-center gap-3"
              style={{
                borderBottom: '1px solid var(--color-border)',
                background: selectedStop?.id === stop.id ? 'var(--color-accent-dim)' : 'transparent',
              }}
            >
              <span style={{ color: 'var(--color-accent)' }}>🚏</span>
              <div>
                <div style={{ color: 'var(--color-text)' }}>{stop.name}</div>
                {stop.zone && (
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{stop.zone}</div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {stops && stops.length === 0 && query.length >= 2 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 rounded-xl px-4 py-3 text-sm"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
          No stops found for "{query}"
        </div>
      )}
    </div>
  );
}