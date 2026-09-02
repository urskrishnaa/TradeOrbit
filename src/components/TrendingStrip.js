import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingCoins, coinGeckoApi } from "../config/api";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles({
  section: {
    borderBottom: "1px solid #262932",
    padding: "20px 0",
  },
  label: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#868D97",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    padding: "0 24px 12px",
  },
  row: {
    display: "flex",
    gap: 12,
    overflowX: "auto",
    padding: "0 24px 4px",
    scrollSnapType: "x proximity",
  },
  card: {
    scrollSnapAlign: "start",
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#16171C",
    border: "1px solid #262932",
    borderRadius: 10,
    padding: "10px 16px",
    textDecoration: "none",
    transition: "border-color 0.2s ease, transform 0.2s ease",
    "&:hover": {
      borderColor: "#00BFA6",
      transform: "translateY(-2px)",
    },
  },
  symbol: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    color: "#F2F3F5",
    textTransform: "uppercase",
  },
  price: {
    color: "#F2F3F5",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
  },
  delta: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
  },
});

const TrendingStrip = () => {
  const classes = useStyles();
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await coinGeckoApi.get(TrendingCoins(currency));
        setTrending(data);
      } catch (e) {
        // decorative strip - fail silently
      }
    };
    fetchTrending();
  }, [currency]);

  if (trending.length === 0) return null;

  return (
    <div className={classes.section}>
      <div className={classes.label}>Trending now</div>
      <div className={classes.row}>
        {trending.map((coin) => {
          const up = coin.price_change_percentage_24h >= 0;
          return (
            <Link
              to={`/coins/${coin.id}`}
              className={classes.card}
              key={coin.id}
            >
              <img
                src={coin.image}
                alt={coin.name}
                height={22}
                width={22}
                loading="lazy"
              />
              <span className={classes.symbol}>{coin.symbol}</span>
              <span className={classes.price}>
                {symbol}
                {coin.current_price?.toLocaleString()}
              </span>
              <span
                className={classes.delta}
                style={{ color: up ? "#23D18B" : "#FF5C5C" }}
              >
                {up ? "+" : ""}
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingStrip;
