import * as Yup from "yup";
import { InitialValueType } from "../../types";

const baseValidationForm: Yup.Schema<InitialValueType> = Yup.object({
  amount: Yup.string()
    .matches(/^[1-9][0-9]*$/, "Amount must be a non-zero, positive, integer")
    .required("Please enter stake amount")
});

export default baseValidationForm;