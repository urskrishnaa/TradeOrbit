import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CoinList, coinGeckoApi } from "../config/api";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles({
  wrap: {
    backgroundColor: "#0A0B0D",
    borderBottom: "1px solid #262932",
    overflow: "hidden",
    whiteSpace: "nowrap",
    padding: "10px 0",
    height: 37,
  },
  track: {
    display: "inline-flex",
    animation: "$scroll 45s linear infinite",
  },
  "@keyframes scroll": {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(-50%)" },
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "0 24px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
  },
  symbol: {
    color: "#868D97",
    textTransform: "uppercase",
  },
});

const TickerTape = () => {
  const classes = useStyles();
  const [coins, setCoins] = useState([]);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const { data } = await coinGeckoApi.get(CoinList(currency, 15));
        setCoins(data);
      } catch (e) {
        // decorative strip - fail silently
      }
    };
    fetchTicker();
  }, [currency]);

  if (coins.length === 0) return <div className={classes.wrap} />;

  const renderItems = (keyPrefix) =>
    coins.map((coin) => {
      const up = coin.price_change_percentage_24h >= 0;
      return (
        <span className={classes.item} key={`${keyPrefix}-${coin.id}`}>
          <span className={classes.symbol}>{coin.symbol}</span>
          <span style={{ color: "#F2F3F5" }}>
            {symbol}
            {coin.current_price?.toLocaleString()}
          </span>
          <span style={{ color: up ? "#23D18B" : "#FF5C5C" }}>
            {up ? "+" : ""}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
      );
    });

  return (
    <div className={classes.wrap}>
      <div className={classes.track}>
        {renderItems("a")}
        {renderItems("b")}
      </div>
    </div>
  );
};

export default TickerTape;
