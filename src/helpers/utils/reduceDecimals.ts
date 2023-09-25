// const reduceDecimals = (str: string, decimalPlaces: number): string => {
//   const floatValue = parseFloat(str);
//   if (!isNaN(floatValue)) {
//     const fixedValue = floatValue.toFixed(decimalPlaces);
//     return fixedValue;
//   }
//   return '0.00';
// };

// export default reduceDecimals;

const reduceDecimals = (str: string, decimalPlaces: number): string => {
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
