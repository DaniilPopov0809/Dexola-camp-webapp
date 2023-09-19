
import { formatEther } from "viem/utils";
import { timeStamp, reduceDecimals } from ".";

const calculateRewardRate = (
  stakedBalance: bigint,
  periodFinish: bigint,
  rewardRate: bigint,
  totalSupply: bigint
):string => {
  const currentTimeStamp = BigInt(timeStamp());
  const totalAvailbleRewards = (periodFinish - currentTimeStamp) * rewardRate;
  const formatted = formatEther(
    (stakedBalance * totalAvailbleRewards) / totalSupply + stakedBalance
  );

  return reduceDecimals(formatted, 2);
};

export default calculateRewardRate;


// import timeStamp from "./timeStamp";
// import { formatEther } from "viem/utils";

// const calculateRewardRate = (
    //   stakedBalance: bigint,
    //   periodFinish: bigint,
    //   rewardRate: bigint,
    //   totalSupply: bigint
    // ) => {
    
    //   const currentTimeStamp = timeStamp();
    
    //   const totalAvailbleRewards = (Number(periodFinish) - currentTimeStamp) * Number(rewardRate);
    //   const result = (Number(stakedBalance) * totalAvailbleRewards) / Number(totalSupply) + Number(stakedBalance);
    //   const result = Number(totalSupply);
      
    //   return result;
    // };
    
    // export default calculateRewardRate;