import { formatEther, parseEther } from "viem/utils";
import { timeStamp } from ".";

const calculateRewardRate = (
  stakedBalance: bigint,
  periodFinish: bigint,
  rewardRate: bigint,
  totalSupply: bigint,
  userInputValue: string | undefined
): string => {
  const currentTimeStamp = BigInt(timeStamp());
  const totalAvailbleRewards = (periodFinish - currentTimeStamp) * rewardRate;
  const formatted = formatEther(
    (stakedBalance * totalAvailbleRewards) / totalSupply +
      parseEther(userInputValue ? userInputValue : "")
  );

  return formatted;
};

export default calculateRewardRate;

