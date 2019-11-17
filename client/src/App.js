import React from "react";
import { Router } from "@reach/router";
import Home from "./pages/Home";
import { GlobalStyle } from "./shared/globalStyles";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./api/client";
import { CartProvider } from "./shared/context/CartContext";

function App() {
  return (
    <CartProvider>
      <GlobalStyle></GlobalStyle>
      <ApolloProvider client={client}>
        <Router style={{ height: "100%" }}>
          <Home path='/' />
        </Router>
      </ApolloProvider>
    </CartProvider>
  );
}

export default App;
