# TradeOrbit

**Live crypto prices, market caps, and trend charts — built to feel like a real trading terminal, not a tutorial project.**

🔗 **[Live Demo](https://trade-orbits.vercel.app)** · Built by [Krishna Vishwakarma](https://github.com/urskrishnaa)

---

## Why this project is worth a look

Most crypto-tracker clones stop at "fetch API, render a table." This one goes further:

- **Live scrolling ticker tape** — real trading-floor UX, streaming top coins across the header
- **Custom SVG sparkline component, built from scratch** — no charting library dependency for it; just raw path math over live price data
- **Handles real-world API failure modes** — CoinGecko occasionally returns `null` for price/market-cap fields; the UI defensively falls back instead of crashing (a bug I found, diagnosed via stack trace, and fixed)
- **Secrets kept out of the repo** — API key lives in environment variables (`.env` locally, injected via Vercel at build time), never committed to git history
- **Removed a UI dependency to cut bundle size** — replaced a carousel library with a lightweight CSS scroll-snap implementation for the trending strip
- **Three-font type system with intent** — Space Grotesk for headlines, Inter for body copy, JetBrains Mono with tabular figures for every price and percentage, so numbers actually align in the table

## Tech stack

`React` · `Material UI` · `Chart.js` · `Axios` · `React Router` · `CoinGecko API` · `Vercel`

## Features

- Live prices, 24h change, and market cap for the top 100 coins by market cap
- Search and pagination across the full coin list
- Trending coins strip with live 24h movement
- Per-coin detail page with historical price charts (24h / 30d / 3m / 1y), rendered as gradient area charts
- USD / INR currency toggle, app-wide via React Context

## Running it locally

```bash
git clone https://github.com/urskrishnaa/TradeOrbit.git
cd TradeOrbit
npm install --legacy-peer-deps
npm start
```

You'll need a free [CoinGecko Demo API key](https://www.coingecko.com/en/developers/dashboard) — add it to a `.env` file as `REACT_APP_COINGECKO_API_KEY`.
