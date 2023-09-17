import { useEffect, useState, ReactNode } from "react";
import styles from "./MessageModal.module.scss";

interface MessageModalProps {
  text: ReactNode;
  children: ReactNode;
  isSendingToken?: boolean;
  status?: "error" | "success" | string | undefined;
}

const MessageModal = ({
  text,
  children,
  isSendingToken,
  status,
}: MessageModalProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (isSendingToken) {
      setVisible(true);
    }
  }, [isSendingToken]);

  useEffect(() => {
    setVisible(false);
    if (status === "success" || status === "error") {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
      <div className={`${styles.messageModal} ${visible? "visibleSpinner" : "hiddenSpinner"}`}>
        {children}
        {text}
      </div>
  );
};

export default MessageModal;
