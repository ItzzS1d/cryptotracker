import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Crypto } from "../Context/CryptoContext";

const navBar = {
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "bold",
    curser: "pointer",
  },
};

const Navbar = () => {
  const { currency, setCurrency } = useContext(Crypto);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography style={navBar.title} variant="h6">
              <Link to={"/"}>Crypto Tracker</Link>
            </Typography>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              variant="outlined"
              style={{
                width: "100px",
                height: "40px",
                marginRight: "15px",
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
