# NI Bus Tracker 🚌

A real-time bus tracker web app for Northern Ireland, built with React, TypeScript, and Node.js.

![NI Bus Tracker](https://img.shields.io/badge/status-in%20development-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18-61dafb)

## Features

- 🔍 **Stop Search** — Search for any Translink bus stop by name
- 🗺️ **Interactive Map** — Leaflet map showing all stops across Northern Ireland
- 🕐 **Live Departures** — Real-time departure board with auto-refresh every 30 seconds
- ⭐ **Favourite Stops** — Save frequently used stops locally
- ⚡ **Smart Caching** — Server-side caching to respect the Translink API rate limits

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Maps | Leaflet.js + react-leaflet |
| Data fetching | TanStack Query (React Query) |
| Backend | Node.js + Express + TypeScript |
| Caching | node-cache (server-side) |

## Getting Started

### Prerequisites
- Node.js v18+
- A Translink API key (request at servicedata@translink.co.uk)

### Running locally

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Then open http://localhost:5173

## Data Sources

- **Live data**: [Translink Transport Information API](https://www.translink.co.uk/api)
- **Static data**: [OpenDataNI — Translink datasets](https://admin.opendatani.gov.uk/organization/translink)

## Status

- [x] Project scaffolding
- [x] Static stop data + search
- [x] Interactive map
- [x] Mock departure board
- [x] Favourite stops
- [ ] Live Translink API integration (awaiting API key)
- [ ] Nearby stops (geolocation)
- [ ] GitHub Actions CI