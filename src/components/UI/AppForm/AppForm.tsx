import { ReactNode } from "react";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import FieldInput from "../FieldInput/FieldInput";
import Rate from "../Rate/Rate";
import * as Yup from "yup";
import { reduceDecimals } from "../../../helpers/utils";
import MainButton from "../MainButton/MainButton";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import { InitialValueType } from "../../../types";
import styles from "./AppForm.module.scss";

interface AppFormProps {
  initialValues: InitialValueType;
  handleSubmit: (
    values: InitialValueType,
    formikHelpers: FormikHelpers<InitialValueType>
  ) => void | Promise<unknown>;
  validationForm: Yup.Schema<unknown> | boolean;
  text: string;
  struBalance: string  | undefined;
  isLoading: boolean;
  isDisable: boolean;
  isShowInput: boolean;
  cls?: string;
  children?: ReactNode;
}

const AppForm = ({
  initialValues,
  handleSubmit,
  validationForm,
  text,
  struBalance,
  isLoading,
  isDisable,
  isShowInput,
  cls,
  children,
}: AppFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationForm}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          {isShowInput && <Field name="amount">
            {({ field, meta, form }: FieldProps) => (
              <FieldInput
                field={field}
                meta={meta}
                form={form}
                placeholder={`Enter ${text} amount`}
                type="text"
                name={"amount"}
                aria-label={`${text} amount`}
              />
            )}
          </Field>}
          <div className={`form__rateWrap ${cls? styles[cls]: ""}`}>
            <Rate
              label={"Available:"}
              rate={struBalance ? reduceDecimals(struBalance, 2) : "0.00"}
              unit={"STRU"}
              isTitle={false}
            />
          </div>
          <div className="form__buttonWrap">
            <MainButton
              children={<ButtonLoader text={`${text}`} isLoading={isLoading} />}
              type="submit"
              disabled={isSubmitting || isDisable}
              globalClassName={"linkButton"}
              localClassName={"form__button"}
              additionalClassName={"form__buttonTextWrap"}
            />
            {children}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AppForm;
