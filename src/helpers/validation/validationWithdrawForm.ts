import * as Yup from "yup";
import { InitialValueType } from "../../types";

const validationWithdrawForm: Yup.Schema<InitialValueType> = Yup.object({
  amount: Yup.string()
    .matches(/^[1-9][0-9]*$/, "Amount must be a positive integer")
    .required("Please enter stake amount")
});

export default validationWithdrawForm;