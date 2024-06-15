import { createContext, useContext, useEffect, useState } from "react";

export const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setsymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") {
      setsymbol("₹");
    } else if (currency === "USD") {
      setsymbol("$");
    }
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;
