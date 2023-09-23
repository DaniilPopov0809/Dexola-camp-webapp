import { formatEther, parseEther } from "viem/utils";
import { timeStamp } from ".";

const calculateRewardRate = (
  stakedBalance: bigint,
  periodFinish: bigint,
  rewardRate: bigint,
  totalSupply: bigint,
  userInputValue: string | undefined
): string => {
  // if (!userInputValue) {
  //   return "0.00"
  // }
  const currentTimeStamp = BigInt(timeStamp());
  const totalAvailbleRewards = (periodFinish - currentTimeStamp) * rewardRate;
  const formatted = formatEther(
    (stakedBalance * totalAvailbleRewards) / totalSupply +
      parseEther(userInputValue ? userInputValue : "")
  );

  return formatted;
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
