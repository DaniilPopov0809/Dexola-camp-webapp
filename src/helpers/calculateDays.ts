// import { formatUnits } from "viem";

const calculateDays = (periodFinish: bigint, time: bigint): number => {
  return Number(periodFinish / time);
};

export default calculateDays;
