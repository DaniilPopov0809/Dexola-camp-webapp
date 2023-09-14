import timeStamp from "./timeStamp";

const calculateDays = (periodFinish: bigint): number => {
  const currentTimeStamp = timeStamp();
  return Math.ceil((Number(periodFinish) - currentTimeStamp) / 86400);
};

export default calculateDays;
