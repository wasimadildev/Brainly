import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CookiesProvider } from "react-cookie";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <CookiesProvider>

      <App />
          </CookiesProvider>

    </BrowserRouter>
  </React.StrictMode>
)
