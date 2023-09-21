const isValidDecimal = (value: string): boolean => {
  const decimalPart = value.split(".")[1];

  if (decimalPart && decimalPart.length > 18) {
    return false;
  }

  return true;
};

export default isValidDecimal;
