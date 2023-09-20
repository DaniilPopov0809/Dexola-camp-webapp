import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "sanitize.css";
import "./main.scss";
import { BrowserRouter } from 'react-router-dom';
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./config/wagmiConfig.ts";
import { AppProvider } from "./context/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <AppProvider>
        <App />
        </AppProvider>
      </Provider>
    </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
