
const calculateDays = (periodFinish: bigint): number => {
    const currentTimeStamp = Date.now();
    const currentTimeStampSeconds = BigInt(Math.floor(currentTimeStamp / 1000));
  return Number((periodFinish-currentTimeStampSeconds) / 86400n);
};

export default calculateDays;
