import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "./i18n";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import debug from "debug";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.component";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals(debug("Web Vitals"));
