import { fetchedBalance } from "../operations";
import { parseEther } from "viem";
import { checkMinValue } from ".";

const checkMaxValue = async (value: string): Promise<boolean> => {
  try {
    if (!checkMinValue(value)) {
      return false;
    }
    const balance = await fetchedBalance();
    if (balance && +value > 0.000001) {
      const balanceValue = balance.value;
      const enteredValue = parseEther(value);
      return enteredValue <= balanceValue;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default checkMaxValue;
