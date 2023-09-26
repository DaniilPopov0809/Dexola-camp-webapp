import { useState, useMemo } from "react";
import Title from "../Title/Title";
import InfoBlock from "../InfoBlock/InfoBlock";
import {
  calculateDays,
  calculateApr,
  calculateRewards,
  calculateStakeBalance,
} from "../../../helpers/utils";
import { useForwardsDuration } from "../../../hooks/Abi";
import { useAppContextValue } from "../../../hooks/useContextValue";
import styles from "./Info.module.scss";

const Info = () => {
  const rewardsForDuration = useForwardsDuration();
  const context = useAppContextValue();
  const isConnected = context?.account?.isConnected;
  const { stakeBalance, totalSupply, periodFinish, earned } = context;

  const [days, setDays] = useState(0);
  const [apr, setApr] = useState(0);
  
  //calculete if value change
  useMemo(() => {
    if (rewardsForDuration && totalSupply && periodFinish) {
      setApr(calculateApr(rewardsForDuration, totalSupply));
      setDays(isConnected ? calculateDays(periodFinish) : 0);
    }
  }, [rewardsForDuration, totalSupply, periodFinish, isConnected]);

  return (
    <section className={`container ${styles.info}`}>
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
          count={`${
            stakeBalance ? calculateStakeBalance(stakeBalance) : "0.00"
          }`}
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
          count={`${earned ? calculateRewards(earned) : 0}`}
          title={"Rewards"}
          messageToolTip={"Rewards get allocated every second"}
          tooltipId={"toolTip3"}
        />
      </ul>
    </section>
  );
};

export default Info;
