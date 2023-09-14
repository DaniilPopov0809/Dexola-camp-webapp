import { useAccount } from "wagmi";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import AppForm from "../../components/UI/AppForm/AppForm";
import styles from "./Stake.module.scss";
import Title from "../../components/UI/Title/Title";
import Rate from "../../components/UI/Rate/Rate";

const Stake = () => {
  const { isConnected } = useAccount();
  return (
    <section className={`container ${styles.stake}`}>
      {isConnected ? (
        <div className={styles.stake__formWrap}>
          <Title
            text={"Stake"}
            globalClassName={"title__h2"}
            titleTag={"h2"}
            localClassName={"appForm"}
            number={
              <Rate label={"Reward rate:"} rate={"1"} unit={"STRU/WEEK"} />
            }
          />
          <AppForm />
        </div>
      ) : (
        <NoWalletConnect />
      )}
    </section>
  );
};

export default Stake;
