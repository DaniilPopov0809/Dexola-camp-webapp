import * as Yup from "yup";
import { InitialValueType } from "../../types";
import { fetchedBalance } from "../operations";

const validationStakeForm: Yup.Schema<InitialValueType> = Yup.object({
  amount: Yup.string()
    .required("Please enter stake amount")
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
      "The amount must not exceed the wallet balance",
      async (value) => {
        try {
          const balance = await fetchedBalance();
          if (balance) {
            const balanceValue = parseInt(balance.formatted, 10);
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

export default validationStakeForm;
