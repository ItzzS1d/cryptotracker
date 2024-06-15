import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { useContext, useEffect, useState } from "react";
import { LinearProgress, Typography } from "@mui/material";
import { Crypto } from "../Context/CryptoContext";
import CoinInfo from "../components/CoinInfo";

export const Coin = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(false);
  const { coins } = useParams();
  const { currency, symbol } = useContext(Crypto);

  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(coins));
    if (data) {
      setLoading(false);
      setCoin(data);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <>
      {loading ? (
        <LinearProgress style={{ backgroundColor: "gold", color: "blue" }} />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "50px",
            }}
          >
            {/* sidebar */}
            <img
              src={coin?.image?.large}
              alt={coin?.name}
              height="200px"
              style={{ marginBottom: "20px" }}
            />
            <Typography variant="h3">{coin?.name}</Typography>
            <Typography variant="subtitle1">
              {coin?.description?.en.split(".")[0]}
            </Typography>
            <div>
              <span style={{ display: "flex" }}>
                <Typography variant="h5">Rank:</Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  {coin?.market_cap_rank}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography variant="h5">Current Price:</Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  {symbol}{" "}
                  {coin?.market_data?.current_price[
                    currency.toLowerCase()
                  ].toLocaleString("en-IN")}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography variant="h5">Market Cap:</Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  {symbol}{" "}
                  {coin?.market_data?.market_cap[currency.toLowerCase()]
                    .toLocaleString("en-IN")
                    .toString()
                    .slice(0, -6)}{" "}
                  M
                </Typography>
              </span>
            </div>
          </div>
          <div>
            <hr style={{ color: "gold", marginBottom: "10px" }} />
            {/* chart */}
            <CoinInfo coin={coin} />
          </div>
        </div>
      )}
    </>
  );
};
