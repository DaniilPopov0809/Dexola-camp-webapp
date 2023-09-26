import debounce from "lodash.debounce";

const checkMinValue = debounce((value: string): boolean => {
  const valueToNumber = +value;
  if (
    isNaN(valueToNumber) ||
    valueToNumber < 0.000000000000000001 ||
    valueToNumber === 0
  ) {
    return false;
  }
  return true;
}, 300)

export default checkMinValue;
