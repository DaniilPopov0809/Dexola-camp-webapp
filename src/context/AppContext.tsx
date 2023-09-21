import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import useWalletBalance from "../hooks/useWalletBalance";
import {
  useEarned,
  usePeriodFinish,
  useTotalSupply,
  useStakeBalance,
} from "../hooks/Abi";
import { useAccount } from "wagmi";
import { TokenStatus } from "../types";
import { GetAccountResult, FetchBalanceResult } from "@wagmi/core";

type AppContextType = {
  struBalance: FetchBalanceResult | undefined;
  ethBalance: FetchBalanceResult | undefined;
  account: GetAccountResult | undefined;
  earned: bigint | undefined;
  periodFinish: bigint | undefined;
  totalSupply: bigint | undefined;
  stakeBalance: bigint | undefined;
  inputValue: string | undefined;
  setInputValue: Dispatch<SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const struBalance = useWalletBalance(TokenStatus.Token);
  const ethBalance = useWalletBalance(TokenStatus.NotToken);
  const account = useAccount();
  const earned = useEarned();
  const periodFinish = usePeriodFinish();
  const totalSupply = useTotalSupply();
  const stakeBalance = useStakeBalance();
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        struBalance,
        ethBalance,
        account,
        earned,
        periodFinish,
        totalSupply,
        stakeBalance,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
