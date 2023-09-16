import * as Yup from "yup";
import { InitialValueType } from "../types";
import { fetchedBalance } from "./operations";

const validationForm: Yup.Schema<InitialValueType> = Yup.object({
  amount: Yup.string()
    .matches(/^[1-9][0-9]*$/, "Amount must be a non-zero, positive, integer")
    .required("Please enter stake amount")
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

export default validationForm;
