import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { Coin } from "./Pages/Coin";
import { styled } from "@mui/material/styles";
import Navbar from "./components/Navbar";

const AppContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
}));

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coins" element={<Coin />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
