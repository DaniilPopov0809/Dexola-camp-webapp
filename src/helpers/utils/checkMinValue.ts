const checkMinValue = (value: string): boolean => {
  const valueToNumber = +value;
  if (
    isNaN(valueToNumber) ||
    valueToNumber < 0.000000000000000001 ||
    valueToNumber === 0
  ) {
    return false;
  }
  return true;
}

export default checkMinValue;
