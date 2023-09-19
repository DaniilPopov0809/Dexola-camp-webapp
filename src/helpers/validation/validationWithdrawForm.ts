import * as Yup from "yup";
import { InitialValueType } from "../../types";
import { fetchedStakeBalance } from "../operations";
import { formatEther } from "viem";

const validationWithdrawForm: Yup.Schema<InitialValueType> = Yup.object({
  amount: Yup.string()
    .required("Please enter withdraw amount")
    .test("isValidAmount", "Please enter a positive number (min:0.000000000000000001)", (value) => {
      const valueToNumber = +value;
      if (
        isNaN(valueToNumber) ||
        valueToNumber < 0.000000000000000001 ||
        valueToNumber === 0
      ) {
        return false;
      }
      return true;
    })
    .test(
      "maxAmount",
      "The amount must not exceed the staked balance",
      async (value) => {
        try {
          const stakeBalance = await fetchedStakeBalance();
          if (stakeBalance) {
            const balanceValue = parseInt(formatEther(stakeBalance), 10);
            const enteredValue = parseInt(value, 10);
            return enteredValue <= balanceValue;
          }
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    ),
});

export default validationWithdrawForm;
