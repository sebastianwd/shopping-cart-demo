import React from "react";
import { Router } from "@reach/router";
import Home from "./pages/Home";
import { GlobalStyle } from "./shared/globalStyles";

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Router style={{ height: "100%" }}>
        <Home path='/' />
      </Router>
    </>
  );
}

export default App;
