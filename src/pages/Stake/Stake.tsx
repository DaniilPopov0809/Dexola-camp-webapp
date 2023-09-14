import { useAccount } from "wagmi";
import {
  useStakeBalance,
  useTotalSupply,
  usePeriodFinish,
  useRewardRate,
} from "../../hooks/contractAbi";
import calculateRewardRate from "../../helpers/calculateRewardRate";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
// import AppForm from "../../components/UI/AppForm/AppForm";
import styles from "./Stake.module.scss";
import Title from "../../components/UI/Title/Title";
import Rate from "../../components/UI/Rate/Rate";

const Stake = () => {
  const { isConnected } = useAccount();
  let rate = null; 

  const stakedBalance = useStakeBalance();
  console.log("🚀 ~ file: Stake.tsx:20 ~ Stake ~ stakedBalance:", stakedBalance)
  console.log("🚀 ~ file: Stake.tsx:20 ~ Stake ~ stakedBalance:", typeof stakedBalance)
  const periodFinish = usePeriodFinish();
  console.log("🚀 ~ file: Stake.tsx:22 ~ Stake ~ periodFinish:", periodFinish)
  console.log("🚀 ~ file: Stake.tsx:22 ~ Stake ~ periodFinish:", typeof periodFinish)
  const rewardRate = useRewardRate();
  console.log("🚀 ~ file: Stake.tsx:24 ~ Stake ~ rewardRate:", rewardRate)
  console.log("🚀 ~ file: Stake.tsx:24 ~ Stake ~ rewardRate:", typeof rewardRate)
  const totalSupply = useTotalSupply();
  console.log("🚀 ~ file: Stake.tsx:26 ~ Stake ~ totalSupply:", totalSupply)
  console.log("🚀 ~ file: Stake.tsx:26 ~ Stake ~ totalSupply:", typeof totalSupply)
  
  if (isConnected){
   rate = calculateRewardRate(
 
    stakedBalance,
    periodFinish,
    rewardRate,
    totalSupply
  );
}



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
              <Rate label={"Reward rate:"} rate={`${rate? rate: 0}`} unit={"STRU/WEEK"} />
            }
          />
          {/* <AppForm /> */}
        </div>
      ) : (
        <NoWalletConnect />
      )}
    </section>
  );
};

export default Stake;
