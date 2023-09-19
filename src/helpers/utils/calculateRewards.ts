import { formatEther } from "viem";
import { reduceDecimals } from ".";

const calculateRewards = (stru: bigint): string => {
  const formated = formatEther(stru);
  return reduceDecimals(formated, 2);
};

export default calculateRewards;
