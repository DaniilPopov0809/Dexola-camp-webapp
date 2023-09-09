import { createConfig, configureChains, mainnet, sepolia } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: "fde9480a4ce74735b09c4ea1376b6695" }),
    publicProvider(),
  ]
);

// Set up wagmi config
export const customConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: "wagmi",
    //   },
    // }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: "...",
    //   },
    // }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: "Injected",
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  publicClient,
  webSocketPublicClient,
});

// export default customConfig;
