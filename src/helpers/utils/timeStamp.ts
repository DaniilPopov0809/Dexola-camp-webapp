//get current time
const timeStamp = (): number => {
  const currentTimeStamp = Date.now();
  return Math.floor(currentTimeStamp / 1000);
};

export default timeStamp;
