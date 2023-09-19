import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

import { configureChains, createConfig, mainnet } from "wagmi";
import { sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

const {VITE_PROJECT_ID, VITE_API_KEY } = import.meta.env;

const chains = [sepolia, mainnet];
export const projectId = VITE_PROJECT_ID;

const { publicClient } = configureChains(chains, [
  alchemyProvider({ apiKey: VITE_API_KEY }),
  w3mProvider({ projectId }),
]);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
export const ethereumClient = new EthereumClient(wagmiConfig, chains);
