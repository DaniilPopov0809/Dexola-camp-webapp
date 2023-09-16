import { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { formatEther } from "viem";
import Rate from "../Rate/Rate";
import MainButton from "../MainButton/MainButton";
import FieldInput from "../FieldInput/FieldInput";
import useWalletBalance from "../../../hooks/useWalletBalance";
import { approveTransaction, stakedTokens } from "../../../helpers/operations";
import { useAllowance } from "../../../hooks/contractAbi";
import { TokenStatus } from "../../../types";
import styles from "./AppForm.module.scss";
import { InitialValueType } from "../../../types";
import validationForm from "../../../helpers/validationForm";

const AppForm = () => {
  const [allowance, setAllowance] = useState(0n);

  const struBalance = useWalletBalance(TokenStatus.Token);
  const getAllowance = useAllowance();

  useEffect(() => {
    setAllowance(getAllowance);
  }, [getAllowance]);

  const initialValues: InitialValueType = {
    amount: "",
  };

  const handleSubmit = async (
    values: InitialValueType,
    { resetForm, setSubmitting }: FormikHelpers<InitialValueType>
  ) => {
    setSubmitting(true);

    if (allowance === 0n) {
      const isApprove = await approveTransaction(values.amount);
      if (!isApprove) {
        alert("Not Aprove");
        return;
      }
      //   setAllowance(BigInt(parseEther(values.amount)));
    }
    const isStaked = await stakedTokens(values.amount);

    setSubmitting(false);
    if (isStaked) {
      //   setAllowance(0n);
      resetForm();
      alert("Success steked!");
    }
    if (!isStaked) {
      alert(
        `Not steked! transfer amount exceeds allowance don't ${formatEther(
          allowance
        )}`
      );
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationForm}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form} autoComplete="off">
          <Field name="amount">
            {({ field, meta, form }: FieldProps) => (
              <FieldInput
                field={field}
                meta={meta}
                form={form}
                placeholder="Enter stake amount"
                type="text"
                name={"amount"}
                aria-label="Stake amount"
              />
            )}
          </Field>
          <div className={styles.rateWrap}>
            <Rate
              label={"Available:"}
              rate={struBalance ? struBalance.formatted : "0"}
              unit={"STRU"}
            />
          </div>
          <div className={styles.form__buttonWrap}>
            <MainButton
              children={"Stake"}
              type="submit"
              disabled={isSubmitting}
              globalClassName={"linkButton"}
              localClassName={"form__button"}
              //   additionalClassName={"form__buttonTextWrap"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AppForm;
