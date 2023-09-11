import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "sanitize.css";
import "./main.scss";
import { HashRouter } from 'react-router-dom';
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./config/wagmiConfig.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter basename="dexola-camp">
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
    </HashRouter>
  </React.StrictMode>
);
