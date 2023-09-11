import AppRoutes from "./routes/AppRoutes";
import { projectId } from "./config/wagmiConfig";
import { ethereumClient } from "./config/wagmiConfig";
import { Web3Modal } from "@web3modal/react";

function App() {
  return (
    <>
      <AppRoutes />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
