import styles from "./Info.module.scss";
import Title from "../UI/Title/Title";
import InfoBlock from "../UI/InfoBlock/InfoBlock";
import contractAbi from "../../data/contractABI.json";
import {
  useAccount,
  useContractRead,
  // usePrepareContractWrite,
  // useContractWrite,
} from "wagmi";


const VITE_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const Info = () => {
  const { address } = useAccount();
  // console.log("🚀 ~ file: Info.tsx:9 ~ Info ~ address:", address);
  const stakeStruBalance = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const rewardsForDuration = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "getRewardForDuration",
    watch: true,
  });

  const totalSupply = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "totalSupply",
    watch: true,
  });

  const periodFinish = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "periodFinish",
    watch: true,
  });

  const earned = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "earned",
    args: [address],
    watch: true,
  });

  const stakeStru =  Number(stakeStruBalance.data);
  const APR = Number(rewardsForDuration.data)*100/Number(totalSupply.data); 
  const Days = Number(periodFinish.data)/86400;
  const Rewards = Number(earned.data);


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
          count={`${stakeStru}`}
          title={"Staked balance"}
          messageToolTip={"Staking rewards get allocated on this sum"}
          tooltipId={"toolTip1"}
        />
        <InfoBlock
          showInfo={true}
          showStru={false}
          count={`≈${APR}%`}
          title={"APR"}
          messageToolTip={
            "Displays the average for APR. Interest rate is calculated for each amount of tokens"
          }
          tooltipId={"toolTip2"}
        />
        <InfoBlock
          showInfo={false}
          showStru={false}
          count={`${Days}`}
          title={"Days"}
        />
        <InfoBlock
          showInfo={true}
          showStru={true}
          count={`${Rewards}`}
          title={"Rewards"}
          messageToolTip={"Rewards get allocated every second"}
          tooltipId={"toolTip3"}
        />
      </ul>
    </section>
  );
};

export default Info;
