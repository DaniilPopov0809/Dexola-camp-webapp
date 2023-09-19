import { useAccount } from "wagmi";
import {
  useStakeBalance,
  useTotalSupply,
  usePeriodFinish,
  useRewardRate,
} from "../../hooks/Abi";
import { calculateRewardRate } from "../../helpers/utils";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import AppForm from "../../components/UI/StakeForm/StakeForm";
// import styles from "./Stake.module.scss";
import Title from "../../components/UI/Title/Title";
import Rate from "../../components/UI/Rate/Rate";

const Stake = () => {
  const { isConnected } = useAccount();
  let rate = "0";

  const stakedBalance = useStakeBalance();
  const periodFinish = usePeriodFinish();
  const rewardRate = useRewardRate();
  const totalSupply = useTotalSupply();

  if (totalSupply && stakedBalance && periodFinish && rewardRate) {
    rate = calculateRewardRate(
      stakedBalance,
      periodFinish,
      rewardRate,
      totalSupply
    );
  }

  return (
    <section className="container mainSection">
      {isConnected ? (
        <div className="mainSection__formWrap">
          <Title
            text={"Stake"}
            globalClassName={"title__h2"}
            titleTag={"h2"}
            localClassName={"appForm"}
            number={
              <Rate
                label={"Reward rate:"}
                rate={`${rate}`}
                unit={"STRU/WEEK"}
              />
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
