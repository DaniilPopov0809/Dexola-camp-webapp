import styles from "./TextMessageModal.module.scss";

interface TextMessageModallProps {
  title: string;
  amount?: string;
  text: string;
}

const TextMessageModall = ({ title, amount, text }: TextMessageModallProps) => {
  return (
    <div className={styles.message}>
      <span className={amount? styles.message__title : styles.message__amount}>{title}</span>
      {amount && <span className={styles.message__amount}>{amount}</span>}
      <span>{text}</span>
    </div>
  );
};

export default TextMessageModall;
