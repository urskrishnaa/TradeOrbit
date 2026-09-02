import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin, coinGeckoApi } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await coinGeckoApi.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      maxWidth: 1200,
      margin: "0 auto",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: { width: "100%" },
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginTop: 40,
      padding: "0 24px",
      borderRight: "1px solid #1C1E24",
      [theme.breakpoints.down("md")]: {
        borderRight: "none",
        alignItems: "center",
        textAlign: "center",
      },
    },
    heading: {
      fontWeight: 700,
      marginBottom: 16,
      fontFamily: "'Space Grotesk', sans-serif",
    },
    description: {
      width: "100%",
      fontFamily: "Inter",
      fontSize: 14,
      lineHeight: 1.6,
      color: "#868D97",
      paddingBottom: 20,
      textAlign: "left",
      [theme.breakpoints.down("md")]: { textAlign: "center" },
    },
    marketData: {
      alignSelf: "start",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      [theme.breakpoints.down("md")]: { alignItems: "center" },
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: 320,
    },
    label: {
      fontFamily: "Inter",
      color: "#868D97",
      fontSize: 14,
    },
    value: {
      fontFamily: "'JetBrains Mono', monospace",
      color: "#F2F3F5",
      fontSize: 14,
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#16171C" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="72"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h4" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <div className={classes.row}>
            <span className={classes.label}>Rank</span>
            <span className={classes.value}>
              #{numberWithCommas(coin?.market_cap_rank)}
            </span>
          </div>
          <div className={classes.row}>
            <span className={classes.label}>Price</span>
            <span className={classes.value}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </span>
          </div>
          <div className={classes.row}>
            <span className={classes.label}>Market Cap</span>
            <span className={classes.value}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </span>
          </div>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
