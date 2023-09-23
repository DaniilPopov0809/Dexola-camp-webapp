const reduceDecimals = (str: string, decimalPlaces: number): string => {
  const floatValue = parseFloat(str);
  if (!isNaN(floatValue)) {
    const fixedValue = floatValue.toFixed(decimalPlaces);
    return fixedValue;
  }
  return '0.00';
};

export default reduceDecimals;






