import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Stop } from '../services/api';
import { useEffect } from 'react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface FlyToProps {
  stop: Stop | null;
}

function FlyToStop({ stop }: FlyToProps) {
  const map = useMap();
  useEffect(() => {
    if (stop) {
      map.flyTo([stop.lat, stop.lng], 15, { duration: 1.2 });
    }
  }, [stop, map]);
  return null;
}

interface Props {
  stops: Stop[];
  selectedStop: Stop | null;
  onSelectStop: (stop: Stop) => void;
}

export function StopMap({ stops, selectedStop, onSelectStop }: Props) {
  const defaultCenter: [number, number] = [54.5973, -5.9301];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: '400px', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToStop stop={selectedStop} />

      {stops.map(stop => (
        <Marker
          key={stop.id}
          position={[stop.lat, stop.lng]}
          icon={selectedStop?.id === stop.id ? selectedIcon : new L.Icon.Default()}
          eventHandlers={{ click: () => onSelectStop(stop) }}
        >
          <Popup>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <strong>{stop.name}</strong>
              <br />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>{stop.id}</span>
              <br />
              <button
                onClick={() => onSelectStop(stop)}
                style={{
                  marginTop: '6px',
                  padding: '4px 10px',
                  background: '#00d4aa',
                  color: '#0f1117',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                View Departures
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}