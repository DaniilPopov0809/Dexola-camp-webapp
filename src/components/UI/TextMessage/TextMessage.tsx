import styles from "./TextMessage.module.scss";

interface TextMessageProps {
  title: string;
  amount?: string;
  text: string;
}

const TextMessage = ({ title, amount, text }: TextMessageProps) => {
  return (
    <div className={styles.message}>
      <div className={styles.message__container}>
      <span className={amount ? styles.message__title : styles.message__amount}>
        {title}
      </span>
      {amount && <span className={styles.message__amount}>{amount}</span>}
      </div>
      <span className={styles.message__text}>{text}</span>
      
    </div>
  );
};

export default TextMessage;
