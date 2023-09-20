import { createContext, ReactNode } from "react";
import useWalletBalance from "../hooks/useWalletBalance";
import { TokenStatus } from "../types";

type AppContextType = {
  struBalance: string | undefined;
  ethBalance: string | undefined;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const getStruBalance = useWalletBalance(TokenStatus.Token);
  const struBalance = getStruBalance?.formatted;

  const getEthBalance = useWalletBalance(TokenStatus.NotToken);
  const ethBalance = getEthBalance?.formatted;

  return (
    <AppContext.Provider value={{ struBalance, ethBalance }}>
      {children}
    </AppContext.Provider>
  );
};
