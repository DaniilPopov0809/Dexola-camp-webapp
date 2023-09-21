import { fetchedBalance } from "../operations";
import { parseEther } from "viem";

const checkMaxValue = async (value:string) :Promise<boolean>=> {
  try {
    const balance = await fetchedBalance();
    if (balance) {
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