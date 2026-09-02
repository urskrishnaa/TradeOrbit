import axios from "axios";

const API_KEY = process.env.REACT_APP_COINGECKO_API_KEY;

export const coinGeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "x-cg-demo-api-key": API_KEY,
  },
});

export const CoinList = (currency, perPage = 100, sparkline = false) =>
  `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=${sparkline}`;

export const SingleCoin = (id) => `/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const SpotlightCoin = (currency, id = "bitcoin") =>
  `/coins/markets?vs_currency=${currency}&ids=${id}&sparkline=true&price_change_percentage=24h`;
