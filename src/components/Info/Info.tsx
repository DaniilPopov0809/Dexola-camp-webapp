import styles from "./Info.module.scss";
import Title from "../UI/Title/Title";
import InfoBlock from "../UI/InfoBlock/InfoBlock";
import calculateApr from "../../helpers/calculateApr";
import calculateDays from "../../helpers/calculateDays";
import { useAccount } from "wagmi";
import {
  useStakeBalance,
  useForwardsDuration,
  useTotalSupply,
  usePeriodFinish,
  useEarned,
} from "../../hooks/contractAbi";
import { formatEther } from "viem";

const Info = () => {
  const { isConnected } = useAccount();

  const stakeBalance = useStakeBalance();
  const rewardsForDuration = useForwardsDuration();
  const totalSupply = useTotalSupply();
  const periodFinish = usePeriodFinish();
  const earned = useEarned();

  const apr =  calculateApr(rewardsForDuration, totalSupply);
  const days = isConnected ? calculateDays(periodFinish) : 0;

  return (
    <section className={`${styles.info}`}>
      <Title
        text={"StarRunner Token staking"}
        globalClassName={"title__h1"}
        localClassName={"info"}
        titleTag={"h1"}
      />
      <ul className={styles.info__wrap}>
        <InfoBlock
          showInfo={true}
          showStru={true}
          count={`${stakeBalance ? formatEther(stakeBalance) : 0}`}
          title={"Staked balance"}
          messageToolTip={"Staking rewards get allocated on this sum"}
          tooltipId={"toolTip1"}
        />
        <InfoBlock
          showInfo={true}
          showStru={false}
          count={`≈${apr}%`}
          title={"APR"}
          messageToolTip={
            "Displays the average for APR. Interest rate is calculated for each amount of tokens"
          }
          tooltipId={"toolTip2"}
        />
        <InfoBlock
          showInfo={false}
          showStru={false}
          count={`${days}`}
          title={"Days"}
        />
        <InfoBlock
          showInfo={true}
          showStru={true}
          count={`${earned ? formatEther(earned) : 0}`}
          title={"Rewards"}
          messageToolTip={"Rewards get allocated every second"}
          tooltipId={"toolTip3"}
        />
      </ul>
    </section>
  );
};

export default Info;
