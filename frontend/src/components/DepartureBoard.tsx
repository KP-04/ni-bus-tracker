import { useDepartures } from '../hooks/useDepartures';
import type { Stop } from '../services/api';

interface Props {
  stop: Stop | null;
}

const statusColor: Record<string, string> = {
  'On Time': 'var(--color-ontime)',
  'Delayed': 'var(--color-delayed)',
  'Cancelled': 'var(--color-cancelled)',
};

export function DepartureBoard({ stop }: Props) {
  const { data: departures, isLoading, isError } = useDepartures(stop?.id ?? null);

  if (!stop) {
    return (
      <div className="rounded-xl p-6 text-center text-sm"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
        Select a stop to see departures
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>

      <div className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <div className="font-semibold text-sm">{stop.name}</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>Stop ID: {stop.id}</div>
        </div>
        <div className="text-xs px-2 py-1 rounded-full"
          style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)' }}>
          Live
        </div>
      </div>

      {isLoading && (
        <div className="p-6 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
          Loading departures...
        </div>
      )}

      {isError && (
        <div className="p-6 text-center text-sm" style={{ color: 'var(--color-cancelled)' }}>
          Failed to load departures. Is the backend running?
        </div>
      )}

      {departures && departures.map((dep, i) => (
        <div key={i} className="px-4 py-3 flex items-center gap-3"
          style={{ borderBottom: '1px solid var(--color-border)' }}>

          <div className="font-bold text-sm w-16 text-center px-2 py-1 rounded-lg shrink-0"
            style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)' }}>
            {dep.service}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{dep.destination}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
              {dep.operator}{dep.platform ? ` · Platform ${dep.platform}` : ''}
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-sm font-semibold">{dep.expectedTime}</div>
            <div className="text-xs mt-0.5" style={{ color: statusColor[dep.status] }}>
              {dep.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}