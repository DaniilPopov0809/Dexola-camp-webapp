import timeStamp from "./timeStamp";
// import { formatEther } from "viem/utils";

const calculateRewardRate = (
  stakedBalance: bigint,
  periodFinish: bigint,
  rewardRate: bigint,
  totalSupply: bigint
) => {
  const currentTimeStamp = timeStamp();
  const totalAvailbleRewards = (Number(periodFinish) - currentTimeStamp) * Number(rewardRate);
  const result = (Number(stakedBalance) * totalAvailbleRewards) / Number(totalSupply) + Number(stakedBalance);
  console.log("🚀 ~ file: calculateRewardRate.ts:13 ~ result:", result)
  
  return result;
};

export default calculateRewardRate;


// import { formatEther } from "viem/utils";

// const calculateRewardRate = (
//   stakedBalance: bigint,
//   periodFinish: bigint,
//   rewardRate: bigint,
//   totalSupply: bigint
// ) => {
//   const currentTimeStamp = BigInt(timeStamp());
//   const totalAvailableRewards = (periodFinish - currentTimeStamp) * rewardRate;
//   const stakedBalanceBigInt = BigInt(stakedBalance); // Преобразуем stakedBalance к bigint
//   const totalSupplyBigInt = BigInt(totalSupply); // Преобразуем totalSupply к bigint
//   const result = (stakedBalanceBigInt * totalAvailableRewards) / totalSupplyBigInt + stakedBalanceBigInt;
//   const formatted = formatEther(result); // Преобразуем результат к строке для форматирования
//   return Math.floor(Number(formatted));
// };

// export default calculateRewardRate;