import { useAccount } from "wagmi";
import {
  useStakeBalance,
  useTotalSupply,
  usePeriodFinish,
  useRewardRate,
} from "../../hooks/contractAbi";
import calculateRewardRate from "../../helpers/calculateRewardRate";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import AppForm from "../../components/UI/AppForm/AppForm";
import styles from "./Stake.module.scss";
import Title from "../../components/UI/Title/Title";
import Rate from "../../components/UI/Rate/Rate";

const Stake = () => {
  const { isConnected } = useAccount();

  const stakedBalance = useStakeBalance();
  const periodFinish = usePeriodFinish();
  const rewardRate = useRewardRate();
  const totalSupply = useTotalSupply();

  const rate = isConnected? calculateRewardRate(
    stakedBalance,
    periodFinish,
    rewardRate,
    totalSupply
  ): 0;

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
              <Rate label={"Reward rate:"} rate={`${rate}`} unit={"STRU/WEEK"} />
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
