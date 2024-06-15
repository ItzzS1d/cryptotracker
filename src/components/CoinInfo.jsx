import axios from "axios";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Crypto } from "../Context/CryptoContext";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const { currency } = useContext(Crypto);
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    setflag(true);
    if (coin.id) {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      if (data) {
        setflag(false);
        setHistoricData(data.prices);
      }
    }
  };
  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {!historicData | flag ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={200}
            thickness={1}
          />
        ) : (
          <>
            <div style={{ width: "90%", margin: "0 auto" }}>
              <Chart
                type="line"
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
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
            </div>
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
