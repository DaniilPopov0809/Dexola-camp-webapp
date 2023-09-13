
const calculateDays = (periodFinish: bigint, dayTime: bigint): number => {
    const currentTimeStamp = Date.now();
    const currentTimeStampSeconds = BigInt(Math.floor(currentTimeStamp / 1000));
  return Number((periodFinish-currentTimeStampSeconds) / dayTime);
};

export default calculateDays;
