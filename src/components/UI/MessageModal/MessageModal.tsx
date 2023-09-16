import { useEffect, useState, ReactNode } from "react";
import styles from "./MessageModal.module.scss";

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
  status,
}: MessageModalProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (isLoading) {
      setVisible(true);
    }
  }, [isLoading]);

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
    visible && (
      <div className={styles.messageModal}>
        {children}
        {text}
      </div>
    )
  );
};

export default MessageModal;
