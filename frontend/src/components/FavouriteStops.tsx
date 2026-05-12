import { useState, useEffect } from 'react';
import type { Stop } from '../services/api';

interface Props {
  selectedStop: Stop | null;
  onSelectStop: (stop: Stop) => void;
}

const STORAGE_KEY = 'ni-bus-tracker-favourites';

export function FavouriteStops({ selectedStop, onSelectStop }: Props) {
  const [favourites, setFavourites] = useState<Stop[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const isFavourited = selectedStop
    ? favourites.some(f => f.id === selectedStop.id)
    : false;

  const toggleFavourite = () => {
    if (!selectedStop) return;
    if (isFavourited) {
      setFavourites(prev => prev.filter(f => f.id !== selectedStop.id));
    } else {
      setFavourites(prev => [...prev, selectedStop]);
    }
  };

  return (
    <div>
      {selectedStop && (
        <button
          onClick={toggleFavourite}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors mb-4"
          style={{
            background: isFavourited ? 'var(--color-accent-dim)' : 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: isFavourited ? 'var(--color-accent)' : 'var(--color-muted)',
            cursor: 'pointer',
          }}
        >
          {isFavourited ? '★ Saved' : '☆ Save stop'}
        </button>
      )}

      {favourites.length > 0 && (
        <div className="rounded-xl overflow-hidden"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--color-muted)', borderBottom: '1px solid var(--color-border)' }}>
            Saved Stops
          </div>
          {favourites.map(stop => (
            <button
              key={stop.id}
              onClick={() => onSelectStop(stop)}
              className="w-full text-left px-4 py-3 text-sm transition-opacity hover:opacity-70 flex items-center gap-2"
              style={{
                borderBottom: '1px solid var(--color-border)',
                background: selectedStop?.id === stop.id ? 'var(--color-accent-dim)' : 'transparent',
                color: 'var(--color-text)',
              }}
            >
              <span style={{ color: 'var(--color-accent)' }}>★</span>
              <span className="truncate">{stop.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}