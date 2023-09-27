//balance conversions without rounding
const reduceDecimals = (str: string, decimalPlaces: number): string => {
  console.log("🚀 ~ file: reduceDecimals.ts:3 ~ reduceDecimals ~ str:", str)
  if (str.indexOf(".") === -1) {
    return `${str}.00`;
  } else {
    const parts = str.split(".");
    const beforeDot = parts[0];
    const afterDot = parts[1];
    const reduceAfterDot = afterDot
      .slice(0, decimalPlaces)
      .padEnd(decimalPlaces, "0");
    return `${beforeDot}.${reduceAfterDot}`;
  }
};

export default reduceDecimals;
