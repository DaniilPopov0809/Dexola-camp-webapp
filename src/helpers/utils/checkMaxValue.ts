
import { parseEther } from "viem";
import { FetchBalanceResult } from "@wagmi/core";
import { checkMinValue } from ".";

const checkMaxValue = async (value: string, func: () => Promise<FetchBalanceResult | undefined>): Promise<boolean> => {
  try {
    if (!checkMinValue(value)) {
      return false;
    }
    const balance = await func();
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
