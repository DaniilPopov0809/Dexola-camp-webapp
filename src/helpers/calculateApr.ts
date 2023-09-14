import { formatEther } from "viem";

const calculateApr = (
  rewardsForDuration: bigint,
  totalSupply: bigint
): number => {
  const rewardsForDurationNumber = +formatEther(rewardsForDuration);
  const totalSupplyNumber = +formatEther(totalSupply); 
  if (totalSupplyNumber === 0) {
    return 0;
  }
  return Math.round((rewardsForDurationNumber * 100) / totalSupplyNumber);
};

export default calculateApr;
