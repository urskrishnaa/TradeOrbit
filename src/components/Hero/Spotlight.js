import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { SpotlightCoin, coinGeckoApi } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import Sparkline from "../Sparkline";

const useStyles = makeStyles({
  card: {
    background: "linear-gradient(180deg, #16171C 0%, #101116 100%)",
    border: "1px solid #262932",
    borderRadius: 12,
    padding: "28px 28px 20px",
    minWidth: 280,
  },
  label: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#868D97",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  price: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 40,
    fontWeight: 500,
    color: "#F2F3F5",
    margin: "8px 0 4px",
    fontVariantNumeric: "tabular-nums",
  },
  delta: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 14,
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 20,
  },
});

const Spotlight = () => {
  const classes = useStyles();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        const { data } = await coinGeckoApi.get(
          SpotlightCoin(currency, "bitcoin")
        );
        setCoin(data?.[0] ?? null);
      } catch (e) {
        // decorative card - fail silently
      }
    };
    fetchSpotlight();
  }, [currency]);

  if (!coin) return <div className={classes.card} style={{ minHeight: 180 }} />;

  const up = coin.price_change_percentage_24h >= 0;
  const color = up ? "#23D18B" : "#FF5C5C";

  return (
    <div className={classes.card}>
      <div className={classes.label}>
        {coin.name} · {coin.symbol?.toUpperCase()}
      </div>
      <div className={classes.price}>
        {symbol}
        {coin.current_price?.toLocaleString()}
      </div>
      <span
        className={classes.delta}
        style={{
          color,
          backgroundColor: up
            ? "rgba(35,209,139,0.12)"
            : "rgba(255,92,92,0.12)",
        }}
      >
        {up ? "+" : ""}
        {coin.price_change_percentage_24h?.toFixed(2)}% (24h)
      </span>
      <div style={{ marginTop: 18 }}>
        <Sparkline
          data={coin.sparkline_in_7d?.price}
          width={260}
          height={60}
          color={color}
          strokeWidth={1.75}
        />
      </div>
      <div className={classes.label} style={{ marginTop: 8 }}>
        7-day trend
      </div>
    </div>
  );
};

export default Spotlight;
