import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useLocation } from "react-router-dom";
type MainContextType = {
  visibleModalMesStake: boolean;
  setVisibleModalMesStake: Dispatch<SetStateAction<boolean>>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;

  isLoadingStake: boolean;
  setIsLoadingStake: Dispatch<SetStateAction<boolean>>;
  isSendingToken: boolean;
  setIsSendingToken: Dispatch<SetStateAction<boolean>>;
  isApproving: boolean;
  setIsApproving: Dispatch<SetStateAction<boolean>>;
  endOperation: "stake" | "approve" | undefined;
  setEndOperation: Dispatch<SetStateAction<"stake" | "approve" | undefined>>;
  errorMes: string;
  setErrorMes: Dispatch<SetStateAction<string>>;
  statusStake: "success" | "error" | undefined;
  setStatusStake: Dispatch<SetStateAction<"success" | "error" | undefined>>;
  amountStru: string;
  setAmountStru: Dispatch<SetStateAction<string>>;

  isLoadingReward: boolean;
  setIsLoadingReward: Dispatch<SetStateAction<boolean>>;
  isGettingReward: boolean;
  setIsGettingReward: Dispatch<SetStateAction<boolean>>;
  statusReward: "success" | "error" | undefined;
  setStatusReward: Dispatch<SetStateAction<"success" | "error" | undefined>>;
  visibleModalMesReward: boolean;
  setVisibleModalMesReward: Dispatch<SetStateAction<boolean>>;

  isLoadingWithdraw: boolean;
  setIsLoadingWithdraw: Dispatch<SetStateAction<boolean>>;
  isLoadingWithdrawAll: boolean;
  setIsLoadingWithdrawAll: Dispatch<SetStateAction<boolean>>;
  isGettingWithdraw: boolean;
  setIsGettingWithdraw: Dispatch<SetStateAction<boolean>>;
  statusWithdraw: "success" | "error" | undefined;
  setStatusWithdraw: Dispatch<SetStateAction<"success" | "error" | undefined>>;
  visibleModalMesWithdraw: boolean;
  setVisibleModalMesWithdraw: Dispatch<SetStateAction<boolean>>;
};

export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [visibleModalMesStake, setVisibleModalMesStake] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoadingStake, setIsLoadingStake] = useState(false);
  const [isSendingToken, setIsSendingToken] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [endOperation, setEndOperation] = useState<
    "stake" | "approve" | undefined
  >(undefined);
  const [errorMes, setErrorMes] = useState("");
  const [statusStake, setStatusStake] = useState<
    "success" | "error" | undefined
  >(undefined);
  const [amountStru, setAmountStru] = useState("");

  const [isLoadingReward, setIsLoadingReward] = useState(false);
  const [isGettingReward, setIsGettingReward] = useState(false);
  const [statusReward, setStatusReward] = useState<
    "success" | "error" | undefined
  >(undefined);
  const [visibleModalMesReward, setVisibleModalMesReward] = useState(false);

  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
  const [isLoadingWithdrawAll, setIsLoadingWithdrawAll] = useState(false);
  const [isGettingWithdraw, setIsGettingWithdraw] = useState(false);
  const [statusWithdraw, setStatusWithdraw] = useState<
    "success" | "error" | undefined
  >(undefined);
  const [visibleModalMesWithdraw, setVisibleModalMesWithdraw] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setVisibleModalMesStake(false);
    // let timer: NodeJS.Timeout | undefined;

    if (statusStake === "success" || statusStake === "error") {
      setVisibleModalMesStake(true);
      // if (location.pathname === "/") {
      const timer = setTimeout(() => {
        setVisibleModalMesStake(false);
        setStatusStake(undefined);
      }, 5000);
      // }
      return () => clearTimeout(timer);
    }
  }, [statusStake, location]);

  useEffect(() => {
    setVisibleModalMesReward(false);
    // let timer: NodeJS.Timeout | undefined;

    if (statusReward === "success" || statusReward === "error") {
      setVisibleModalMesReward(true);
      // if (location.pathname === "/claim") {
      const timer = setTimeout(() => {
        setVisibleModalMesReward(false);
        setStatusReward(undefined);
      }, 5000);
      // }
      return () => clearTimeout(timer);
    }
  }, [statusReward, location]);

  useEffect(() => {
    setVisibleModalMesWithdraw(false);

    if (statusWithdraw === "success" || statusWithdraw === "error") {
      setVisibleModalMesWithdraw(true);
      // let timer: NodeJS.Timeout | undefined;
      // if (location.pathname === "/withdraw") {
      const timer = setTimeout(() => {
        setVisibleModalMesWithdraw(false);
        setStatusWithdraw(undefined);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [statusWithdraw, location]);

  return (
    <MainContext.Provider
      value={{
        errorMes,
        setErrorMes,
        statusStake,
        setStatusStake,
        amountStru,
        setAmountStru,
        visibleModalMesStake,
        setVisibleModalMesStake,
        isSubmitting,
        setIsSubmitting,

        isLoadingStake,
        setIsLoadingStake,
        isSendingToken,
        setIsSendingToken,
        isApproving,
        setIsApproving,
        endOperation,
        setEndOperation,

        isLoadingReward,
        setIsLoadingReward,
        isGettingReward,
        setIsGettingReward,
        statusReward,
        setStatusReward,
        visibleModalMesReward,
        setVisibleModalMesReward,

        isLoadingWithdraw,
        setIsLoadingWithdraw,
        isLoadingWithdrawAll,
        setIsLoadingWithdrawAll,
        isGettingWithdraw,
        setIsGettingWithdraw,
        statusWithdraw,
        setStatusWithdraw,
        visibleModalMesWithdraw,
        setVisibleModalMesWithdraw,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
