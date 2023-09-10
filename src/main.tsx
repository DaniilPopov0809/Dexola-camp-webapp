import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "sanitize.css";
import "./main.scss";
import { BrowserRouter } from 'react-router-dom';
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { WagmiConfig } from "wagmi";
import { customConfig } from "../wagmiConfig.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="dexola-camp">
    <WagmiConfig config={customConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
