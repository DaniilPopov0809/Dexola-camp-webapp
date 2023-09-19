const reduceDecimals = (str: string, decimalPlaces: number):string => {
  if (decimalPlaces <= 0) {
    return str;
  }
  const pattern = new RegExp(`(\\d+\\.\\d{${decimalPlaces}})`);
  const match = str.match(pattern);

  return match ? match[0] : str;
}

export default reduceDecimals;
