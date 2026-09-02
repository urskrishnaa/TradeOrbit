import { useEffect, useState } from "react";
import { HistoricalChart, coinGeckoApi } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await coinGeckoApi.get(
      HistoricalChart(coin.id, days, currency)
    );
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });

  const up =
    historicData && historicData.length > 1
      ? historicData[historicData.length - 1][1] >= historicData[0][1]
      : true;
  const lineColor = up ? "#23D18B" : "#FF5C5C";

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData || flag === false ? (
          <CircularProgress
            style={{ color: "#00BFA6" }}
            size={200}
            thickness={1.5}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: lineColor,
                    backgroundColor: (context) => {
                      const ctx = context.chart.ctx;
                      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                      gradient.addColorStop(0, `${lineColor}33`);
                      gradient.addColorStop(1, `${lineColor}00`);
                      return gradient;
                    },
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.25,
                  },
                ],
              }}
              options={{
                elements: { point: { radius: 0 } },
                scales: {
                  x: {
                    grid: { color: "#1C1E24" },
                    ticks: {
                      color: "#868D97",
                      font: { family: "Inter", size: 11 },
                    },
                  },
                  y: {
                    grid: { color: "#1C1E24" },
                    ticks: {
                      color: "#868D97",
                      font: { family: "JetBrains Mono", size: 11 },
                    },
                  },
                },
                plugins: { legend: { display: false } },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
