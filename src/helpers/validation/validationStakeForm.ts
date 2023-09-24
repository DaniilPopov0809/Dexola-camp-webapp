import * as Yup from "yup";
import { InitialValueType } from "../../types";
import { fetchedBalance } from "../operations";
import { checkMinValue, checkMaxValue, isValidDecimal } from "../utils";

const validationStakeForm: Yup.Schema<InitialValueType> = Yup.object({
  amount: Yup.string()
    .required("Please enter stake amount")
    .test(
      "isValidAmount",
      "Please enter a positive number (min:0.000000000000000001)",
      (value) => {
        return checkMinValue(value);
      }
    )
    .test("maxDemicalPlace", "Incorect value",
    (value) => {
      return isValidDecimal(value);
    })
    .test(
      "maxAmount",
      "The amount must not exceed the wallet balance",
      async (value) => {
        return await checkMaxValue(value, fetchedBalance);
      }
    ),
});

export default validationStakeForm;
