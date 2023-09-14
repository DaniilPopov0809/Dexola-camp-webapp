const calculateDays = (periodFinish: bigint): number => {
  const currentTimeStamp = Date.now();
  const currentTimeStampSeconds = Math.floor(currentTimeStamp / 1000);
  return Math.ceil((Number(periodFinish) - currentTimeStampSeconds) / 86400);
};

export default calculateDays;
