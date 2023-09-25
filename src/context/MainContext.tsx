import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type MainContextType = {
  visibleModalMes: boolean;
  setVisibleModalMes: Dispatch<SetStateAction<boolean>>;
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

  isLoadingWithdraw: boolean;
  setIsLoadingWithdraw: Dispatch<SetStateAction<boolean>>;
  isLoadingWithdrawAll: boolean;
  setIsLoadingWithdrawAll: Dispatch<SetStateAction<boolean>>;
  isGettingWithdraw: boolean;
  setIsGettingWithdraw: Dispatch<SetStateAction<boolean>>;
  statusWithdraw: "success" | "error" | undefined;
  setStatusWithdraw: Dispatch<SetStateAction<"success" | "error" | undefined>>;
};

export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [visibleModalMes, setVisibleModalMes] = useState(false);
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

  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
  const [isLoadingWithdrawAll, setIsLoadingWithdrawAll] = useState(false);
  const [isGettingWithdraw, setIsGettingWithdraw] = useState(false);
  const [statusWithdraw, setStatusWithdraw] = useState<
    "success" | "error" | undefined
  >(undefined);

  const closeMessage = (
    setVisibleModalMes: Dispatch<SetStateAction<boolean>>,
    setStatus: Dispatch<SetStateAction<"success" | "error" | undefined>>
  ) => {
    setVisibleModalMes(false);
    setStatus(undefined);
  };

  useEffect(() => {
    setVisibleModalMes(false);
    if (statusStake === "success" || statusStake === "error") {
      setVisibleModalMes(true);
      const timer = setTimeout(() => {
        closeMessage(setVisibleModalMes, setStatusStake);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [statusStake]);

  useEffect(() => {
    setVisibleModalMes(false);

    if (statusReward === "success" || statusReward === "error") {
      setVisibleModalMes(true);

      const timer = setTimeout(() => {
        closeMessage(setVisibleModalMes, setStatusReward);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [statusReward]);

  useEffect(() => {
    setVisibleModalMes(false);

    if (statusWithdraw === "success" || statusWithdraw === "error") {
      setVisibleModalMes(true);

      const timer = setTimeout(() => {
        closeMessage(setVisibleModalMes, setStatusWithdraw);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [statusWithdraw]);

  return (
    <MainContext.Provider
      value={{
        errorMes,
        setErrorMes,
        statusStake,
        setStatusStake,
        amountStru,
        setAmountStru,
        visibleModalMes,
        setVisibleModalMes,
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

        isLoadingWithdraw,
        setIsLoadingWithdraw,
        isLoadingWithdrawAll,
        setIsLoadingWithdrawAll,
        isGettingWithdraw,
        setIsGettingWithdraw,
        statusWithdraw,
        setStatusWithdraw,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
