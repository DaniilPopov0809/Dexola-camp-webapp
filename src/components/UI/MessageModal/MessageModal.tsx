import { ReactNode } from "react";
import styles from "./MessageModal.module.scss";
import { useMainContextValue } from "../../../hooks/useContextValue";

interface MessageModalProps {
  text: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
  status?: "error" | "success" | string | undefined;
}

const MessageModal = ({
  text,
  children,
  isLoading,
}: // status,
MessageModalProps) => {
  // const [visible, setVisible] = useState(false);

  const mainContext = useMainContextValue();
  const {
    visibleModalMesStake,
    visibleModalMesWithdraw,
    visibleModalMesReward,
  } = mainContext;
  // const setVisible = contex.setVisibleModalMes;

  // useEffect(() => {
  //   setVisible(false);
  //   if (isLoading) {
  //     setVisible(true);
  //   }
  // }, [isLoading, setVisible]);

  // useEffect(() => {
  //   setVisible(false);
  //   if (status === "success" || status === "error") {
  //     setVisible(true);
  //     const timer = setTimeout(() => {
  //       setVisible(false);
  //     }, 5000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [status, setVisible]);

  return (
    <div
      className={`${styles.messageModal} ${
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

export default MessageModal;
