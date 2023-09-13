import {
  EthereumClient,
  w3mConnectors,
  // w3mProvider,
} from "@web3modal/ethereum";

import { configureChains, createConfig } from "wagmi";
import { mainnet, goerli, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

const chains = [goerli, mainnet, sepolia];
export const projectId = VITE_PROJECT_ID;

const { publicClient } = configureChains(chains, [
  alchemyProvider({ apiKey: "2SJ9OU6LOY_N4YH3cIhb8iOvdFPUsncg" }),
  // w3mProvider({ projectId }),
]);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
export const ethereumClient = new EthereumClient(wagmiConfig, chains);
