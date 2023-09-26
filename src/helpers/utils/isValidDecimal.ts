import debounce from "lodash.debounce";

const isValidDecimal = debounce((value: string): boolean => {
  const decimalPart = value.split(".")[1];
  console.log("🚀 ~ file: isValidDecimal.ts:5 ~ isValidDecimal ~ decimalPart:", decimalPart)

  if (decimalPart && decimalPart.length > 18) {
    return false;
  }

  return true;
}, 300);

export default isValidDecimal;
