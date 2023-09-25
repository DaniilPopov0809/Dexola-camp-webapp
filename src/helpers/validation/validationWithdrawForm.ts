import * as Yup from "yup";
import { InitialValueType } from "../../types";
import { fetchedStakeBalance } from "../operations";
import { checkMinValue, checkMaxValue, isValidDecimal } from "../utils";

const validationWithdrawForm: Yup.Schema<InitialValueType> = Yup.object({
  amount: Yup.string()
    .required("Please enter withdraw amount")
    .test("isValidAmount", "Please enter a positive number (min:0.000000000000000001)", (value) => {
      return  checkMinValue(value);
    })
    .test("maxDemicalPlace", "Incorect value",
    (value) => {
      return isValidDecimal(value);
    })
    .test(
      "maxAmount",
      "The amount must not exceed the staked balance",
      async (value) => {
        return checkMaxValue(value, fetchedStakeBalance);
      }
    ),
});

export default validationWithdrawForm;
