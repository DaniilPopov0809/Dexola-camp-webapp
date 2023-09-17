import { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { formatEther } from "viem";
import Rate from "../Rate/Rate";
import MainButton from "../MainButton/MainButton";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import MessageModal from "../MessageModal/MessageModal";
import TextMessageModall from "../TextMessageModal/TextMessageModal";
import MessageIcon from "../MessageIcon/MessageIcon";
import FieldInput from "../FieldInput/FieldInput";
import useWalletBalance from "../../../hooks/useWalletBalance";
import { waitForTransaction } from "@wagmi/core";
import { approveTransaction, stakedTokens } from "../../../helpers/operations";
import { useAllowance } from "../../../hooks/Abi";
import { TokenStatus } from "../../../types";
import validationForm from "../../../helpers/validationForm";
import { Oval } from "react-loader-spinner";
import styles from "./AppForm.module.scss";
import { InitialValueType } from "../../../types";

import errorCross from "../../../images/errorCross.svg";
import successCheck from "../../../images/successCheck.svg";

const AppForm = () => {
  const [allowance, setAllowance] = useState(0n);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [amountStru, setAmountStru] = useState("");
  const [isSendingToken, setIsSendingToken] = useState(false);

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
    setAmountStru(values.amount);
    setIsLoading(true);
    setStatus(undefined);
    setSubmitting(true);

    const allowanceToNumber = +formatEther(allowance);

    if (allowanceToNumber < +values.amount) {
      const isApprove = await approveTransaction(values.amount);
      if (!isApprove) {
        setIsLoading(false);
        setStatus("error");
        return;
      }
      //   setAllowance(BigInt(parseEther(values.amount)));
    }
    const staked = await stakedTokens(values.amount);
    if (staked) {
        setIsSendingToken(true);
      const isSuccess = await waitForTransaction({
        hash: staked,
      });
      if (isSuccess) {
        setIsSendingToken(false);
        resetForm();
        setIsLoading(false);
        setStatus("success");
      }
      if (!isSuccess) {
        setIsSendingToken(false);
        setIsLoading(false);
        setStatus("error");
      }
    }

    // setSubmitting(false);
    // if (staked) {
    //   //   setAllowance(0n);
    //   resetForm();
    //   setIsLoading(false);
    //   setStatus("success");
    // }
    // if (!staked) {
    //   setIsLoading(false);
    //   setStatus("error");
    // }
  };
  return (
    <>
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
                children={<ButtonLoader text={"Stake"} isLoading={isLoading}/>}
                type="submit"
                disabled={isSubmitting}
                globalClassName={"linkButton"}
                localClassName={"form__button"}
                  additionalClassName={"form__buttonTextWrap"}
              />
            </div>
          </Form>
        )}
      </Formik>
      <MessageModal
        text={
          <TextMessageModall
            title={"Adding"}
            amount={`${amountStru} STRU`}
            text={"to Staking"}
          />
        }
        children={
          <Oval
            height={32}
            width={32}
            color="#20FE51"
            wrapperStyle={{ marginRight: "8px" }}
            wrapperClass={isSendingToken? "visibleSpinner" : "hiddenSpinner"}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#6E758B"
            strokeWidth={8}
            strokeWidthSecondary={8}
          />
        }
        isSendingToken={isSendingToken}
      />
      <MessageModal
        text={
          status === "success" ? (
            <TextMessageModall
              title={`${amountStru} STRU`}
              text={"successfully added to Staking"}
            />
          ) : (
            <TextMessageModall
              title={"Connection Error."}
              text={"Please try again"}
            />
          )
        }
        children={
          status === "success" ? (
            <MessageIcon iconPath={successCheck} bgColor={"#20FE51"} />
          ) : (
            <MessageIcon iconPath={errorCross} bgColor={"#FE2D20"} />
          )
        }
        status={status}
      />
    </>
  );
};

export default AppForm;
