import { styled } from "@mui/material/styles";
import { Crypto } from "../../Context/CryptoContext";
import { useContext, useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import axios from "axios";

const CarouselDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));
const Carousel = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const { currency, symbol } = useContext(Crypto);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const items = trendingCoins.map((coin) => {
    let profit = coin.price_change_percentage_24h > 0;
    return (
      <Link
        key={coin.id}
        to={`/coin/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          objectFit: "cover",
          alignItems: "center",
        }}
      >
        <img src={coin?.image} alt={coin?.name} style={{ width: "80px" }} />

        <div style={{ marginTop: "8px" }}>
          <span
            style={{
              color: "white",
              margin: "10px",
              textTransform: "uppercase",
            }}
          >
            {coin?.symbol}
          </span>
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: "bolder",
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 500,
            color: "white",
            marginTop: "5px",
          }}
        >
          {symbol}
          {numberWithCommas(coin?.current_price?.toFixed(2))}
        </div>
      </Link>
    );
  });
  console.log();
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <CarouselDiv>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        items={items}
      ></AliceCarousel>
    </CarouselDiv>
  );
};

export default Carousel;
