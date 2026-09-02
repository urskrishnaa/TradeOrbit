import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
} from "@material-ui/core";
import { CoinList, coinGeckoApi } from "../config/api";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const useStyles = makeStyles({
    container: {
      padding: "48px 24px 64px",
    },
    headRow: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 20,
      marginBottom: 24,
    },
    heading: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: "1.6rem",
      color: "#F2F3F5",
    },
    subheading: {
      fontFamily: "Inter",
      fontSize: 13,
      color: "#868D97",
      marginTop: 4,
    },
    searchWrap: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      borderBottom: "1px solid #262932",
      padding: "6px 2px",
      minWidth: 240,
    },
    searchInput: {
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#F2F3F5",
      fontFamily: "Inter",
      fontSize: 14,
      width: "100%",
    },
    row: {
      cursor: "pointer",
      transition: "background-color 0.15s ease",
      "&:hover": { backgroundColor: "#16171C" },
    },
    cellBase: {
      borderBottom: "1px solid #1C1E24",
      fontFamily: "Inter",
    },
    mono: {
      fontFamily: "'JetBrains Mono', monospace",
      fontVariantNumeric: "tabular-nums",
    },
    pagination: {
      "& .MuiPaginationItem-root": { color: "#868D97" },
      "& .Mui-selected": { color: "#00BFA6", backgroundColor: "transparent" },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await coinGeckoApi.get(CoinList(currency));
      setCoins(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.container}>
        <div className={classes.headRow}>
          <div>
            <Typography className={classes.heading}>Markets</Typography>
            <Typography className={classes.subheading}>
              {coins.length || "—"} assets by market cap
            </Typography>
          </div>
          <div className={classes.searchWrap}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#868D97"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className={classes.searchInput}
              placeholder="Search a coin..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#16171C" }} />
          ) : (
            <Table aria-label="coins table">
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        className={classes.cellBase}
                        style={{
                          color: "#868D97",
                          fontSize: 12,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                        key={head}
                        align={head === "Coin" ? "left" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    const color = profit ? "#23D18B" : "#FF5C5C";
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.id}
                      >
                        <TableCell
                          className={classes.cellBase}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="28"
                            width="28"
                            loading="lazy"
                            style={{ borderRadius: "50%" }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span style={{ color: "#F2F3F5", fontSize: 14 }}>
                              {row.name}
                            </span>
                            <span
                              style={{
                                color: "#868D97",
                                fontSize: 12,
                                textTransform: "uppercase",
                              }}
                            >
                              {row.symbol}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          className={`${classes.cellBase} ${classes.mono}`}
                          style={{ color: "#F2F3F5" }}
                        >
                          {symbol}{" "}
                          {numberWithCommas((row.current_price ?? 0).toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          className={`${classes.cellBase} ${classes.mono}`}
                          style={{ color }}
                        >
                          {profit && "+"}
                          {(row.price_change_percentage_24h ?? 0).toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="right"
                          className={`${classes.cellBase} ${classes.mono}`}
                          style={{ color: "#868D97" }}
                        >
                          {symbol}{" "}
                          {numberWithCommas(
                            (row.market_cap ?? 0).toString().slice(0, -6) ||
                              "0"
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Math.ceil(handleSearch()?.length / 10) || 1}
          style={{ padding: "24px 0", display: "flex", justifyContent: "center" }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
