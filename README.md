# Crypto Pulse

Crypto Pulse is a production-style real-time crypto market terminal built for a frontend technical assignment.

It uses Binance REST for initial snapshots and Binance WebSocket streams for live updates on both the market list and details pages.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- TailwindCSS
- Binance REST + WebSocket APIs

## Core Features

- Spot markets table with at least 10 symbols (`BTCUSDT`, `ETHUSDT`, `BNBUSDT`, etc.)
- Real-time market list updates (price + 24h metrics)
- Real-time details page updates with connection status
- Search and sorting:
  - Favorites first
  - Alphabetical
  - Highest price
  - Highest 24h change
- Favorites persistence with `localStorage`
- Recently viewed markets (last 5) with `localStorage`
- Route-level loading and error boundaries
- Keyboard-friendly interactions (`/` focuses search, row Enter/Space navigation)
- Professional UX polish:
  - subtle skeletons
  - improved empty states
  - consistent formatting for prices/timestamps/percentages

## Project Structure

```text
app/
  globals.css
  icon.svg
  layout.tsx
  loading.tsx
  page.tsx
  markets/
    loading.tsx
    error.tsx
    page.tsx
    [symbol]/
      loading.tsx
      error.tsx
      page.tsx

components/
  ConnectionStatus.tsx
  CryptoIcon.tsx
  FavoriteButton.tsx
  Footer.tsx
  LoadingSkeleton.tsx
  MarketCard.tsx
  MarketDetailsLive.tsx
  MarketFilters.tsx
  MarketGrid.tsx
  MarketHeader.tsx
  MarketSearch.tsx
  MarketTableRow.tsx
  NavBar.tsx
  PriceDisplay.tsx
  RecentlyViewed.tsx
  ThemeToggle.tsx

hooks/
  useFavorites.ts
  useMarkets.ts
  useMarketsTickerStream.ts
  useRecentMarkets.ts
  useWebSocketTicker.ts

lib/
  binance.ts
  formatters.ts
  websocket.ts

types/
  market.ts
```

## Setup

1) Install dependencies

```bash
npm install
```

2) Run in development

```bash
npm run dev
```

3) Build and run production

```bash
npm run build
npm run start
```

4) Lint

```bash
npm run lint
```

Open: `http://localhost:3000`

## Architecture

- **Domain contracts**: `types/market.ts`
- **Data layer**:
  - `lib/binance.ts` (REST calls + mapping + optional server logs)
  - `lib/websocket.ts` (single-stream + combined-stream URL helpers)
- **State hooks**:
  - `useMarkets` (search/sort orchestration)
  - `useFavorites` (persistent favorites)
  - `useRecentMarkets` (persistent last 5 visited)
  - `useWebSocketTicker` (details live stream + reconnect state)
  - `useMarketsTickerStream` (combined live stream for list table)
- **UI components**:
  - composed table rows, filters, details cards, connection status, skeletons
- **Routing**:
  - `/markets` table page
  - `/markets/[symbol]` details page
  - route-level `loading.tsx` and `error.tsx`

## WebSocket Handling

### Details Stream

`useWebSocketTicker(symbol)` connects to:

- `wss://stream.binance.com:9443/ws/{symbol}@ticker`

Returns:

- `price`
- `priceChangePercent24h`
- `timestamp`
- `connectionStatus`
- `error`

Includes reconnect backoff and cleanup.

### Markets List Stream

`useMarketsTickerStream(initialMarkets)` connects using Binance combined streams:

- `wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/...`

Updates list rows live for:

- `lastPrice`
- `24h change` (absolute + percent)
- `open/high/low`
- `volume/quoteVolume`
- `bid/ask`
- `trade count`

## API Logging (Terminal)

Server-side REST logs are enabled by default in `lib/binance.ts`.

To disable:

```bash
DEBUG_BINANCE_API_LOGS=false
```

## Product/UX Decisions

- **Table-first markets layout** to match trading terminal expectations
- **Row navigation + keyboard support** for faster power-user flow
- **Subtle change flash** on live price updates for clarity without noise
- **Persistent user state** (favorites/recently viewed) without backend dependency
- **Shared formatter utilities** for consistent numbers/timestamps/prices

## Tradeoffs

- No backend proxy/cache layer (direct Binance dependency)
- Persistence is browser-local only (no account sync)
- Details stream is per-symbol while list stream is limited to rendered symbols

## Binance Endpoints Used

- REST:
  - `https://api.binance.com/api/v3/ticker/24hr`
- WebSocket:
  - `wss://stream.binance.com:9443/ws/{symbol}@ticker`
  - `wss://stream.binance.com:9443/stream?streams=...`
If you want, I can also unify the existing error.tsx pages with the same visual style so all error states look fully consistent.