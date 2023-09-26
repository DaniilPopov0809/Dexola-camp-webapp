import { ReactNode } from "react";
import styles from "./MessageContainer.module.scss";
import { useMainContextValue } from "../../../hooks/useContextValue";

interface MessageContainerProps {
  text: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
  status?: "error" | "success" | string | undefined;
}

const MessageContainer = ({
  text,
  children,
  isLoading,
}: MessageContainerProps) => {
  const mainContext = useMainContextValue();
  const {
    visibleModalMesStake,
    visibleModalMesWithdraw,
    visibleModalMesReward,
  } = mainContext;

  return (
    <div
      className={`${styles.messageContainer} ${
        visibleModalMesStake ||
        visibleModalMesWithdraw ||
        visibleModalMesReward ||
        isLoading
          ? "visibleSpinner"
          : "hiddenSpinner"
      }`}
    >
      {children}
      {text}
    </div>
  );
};

export default MessageContainer;
