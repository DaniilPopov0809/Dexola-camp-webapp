import timeStamp from "./timeStamp";
import { formatEther } from "viem/utils";

const calculateRewardRate = (
  stakedBalance: bigint,
  periodFinish: bigint,
  rewardRate: bigint,
  totalSupply: bigint
) => {
  const currentTimeStamp = BigInt(timeStamp());
  const totalAvailbleRewards = (periodFinish - currentTimeStamp) * rewardRate;
  const result = (stakedBalance * totalAvailbleRewards) / totalSupply + stakedBalance;
  const formatted = formatEther(result);
  return Math.floor(Number(formatted));
};

export default calculateRewardRate;
