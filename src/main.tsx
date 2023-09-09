import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "sanitize.css";
import "./main.scss";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { WagmiConfig } from "wagmi";
import { customConfig } from "../wagmiConfig.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={customConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
  </React.StrictMode>
);
