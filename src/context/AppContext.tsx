import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useLocation } from "react-router-dom";
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

  // visibleModalMes: boolean;
  // setVisibleModalMes: Dispatch<SetStateAction<boolean>>;

  // isLoadingStake: boolean;
  // setIsLoadingStake: Dispatch<SetStateAction<boolean>>;
  // isSendingToken: boolean;
  // setIsSendingToken: Dispatch<SetStateAction<boolean>>;
  // isApproving: boolean;
  // setIsApproving: Dispatch<SetStateAction<boolean>>;
  // endOperation: "stake" | "approve" | undefined;
  // setEndOperation: Dispatch<SetStateAction<"stake" | "approve" | undefined>>;
  // errorMes: string;
  // setErrorMes: Dispatch<SetStateAction<string>>;
  // status: "success" | "error" | undefined;
  // setStatus: Dispatch<SetStateAction<"success" | "error" | undefined>>;
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

  // const [visibleModalMes, setVisibleModalMes] = useState(false);

  const [inputValue, setInputValue] = useState<string>("");
  // const [isLoadingStake, setIsLoadingStake] = useState(false);
  // const [isSendingToken, setIsSendingToken] = useState(false);
  // const [isApproving, setIsApproving] = useState(false);
  // const [endOperation, setEndOperation] = useState<
  //   "stake" | "approve" | undefined
  // >(undefined);
  // const [errorMes, setErrorMes] = useState("");
  // const [status, setStatus] = useState<"success" | "error" | undefined>(
  //   undefined
  // );

  //  useEffect(() => {
  //   setVisibleModalMes(false);
  //   if (status === "success" || status === "error") {
  //     setVisibleModalMes(true);
  //     const timer = setTimeout(() => {
  //       setVisibleModalMes(false);
  //     }, 5000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [status]);
  

  //clear input value
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setInputValue("");
    }
  }, [location.pathname, setInputValue]);

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

        // visibleModalMes,
        // setVisibleModalMes,

        // isLoadingStake,
        // setIsLoadingStake,
        // isSendingToken,
        // setIsSendingToken,
        // isApproving,
        // setIsApproving,
        // endOperation,
        // setEndOperation,
        // errorMes,
        // setErrorMes,
        // status,
        // setStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
