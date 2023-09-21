import { fetchedBalance } from "../operations";

const checkMaxValue = async (value:string) :Promise<boolean>=> {
  try {
    const balance = await fetchedBalance();
    if (balance) {
      const balanceValue = +balance.formatted;
      const enteredValue = +value;
      return enteredValue <= balanceValue;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }

}

export default checkMaxValue;