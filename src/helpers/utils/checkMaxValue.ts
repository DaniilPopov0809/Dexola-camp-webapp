import { parseEther } from "viem";
import { FetchBalanceResult } from "@wagmi/core";
import { checkMinValue } from ".";

//check balace after enter value on input
const checkMaxValue = async (
  value: string,
  func: () => Promise<FetchBalanceResult | undefined>
): Promise<boolean> => {
  try {
    if (!checkMinValue(value)) {
      return false;
    }
    const balance = await func();
    if (balance || balance === 0n) {        //&& +value > 0.000001
      if (typeof balance === "bigint") {
        const enteredValue = parseEther(value);
        return enteredValue <= balance;
      }
      const balanceValue = balance.value;
      const enteredValue = parseEther(value);
      return enteredValue <= balanceValue;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default checkMaxValue;


