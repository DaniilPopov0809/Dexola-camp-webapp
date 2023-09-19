import { useState } from "react";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { formatEther } from "viem";
import Rate from "../Rate/Rate";
import MainButton from "../MainButton/MainButton";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
// import MessageModal from "../MessageModal/MessageModal";
// import TextMessageModall from "../TextMessageModal/TextMessageModal";
// import MessageIcon from "../MessageIcon/MessageIcon";
import FieldInput from "../FieldInput/FieldInput";
// import useWalletBalance from "../../../hooks/useWalletBalance";
import { withdrawTokens, waitForOperation, exit } from "../../../helpers/operations";
import { useStakeBalance } from "../../../hooks/Abi";
// import { TokenStatus } from "../../../types";
import { validationWithdrawForm } from "../../../helpers/validation";
// import { Oval } from "react-loader-spinner";
import styles from "../StakeForm/StakeForm.module.scss";
import { InitialValueType } from "../../../types";

// import errorCross from "../../../images/errorCross.svg";
// import successCheck from "../../../images/successCheck.svg";

const initialValues: InitialValueType = {
  amount: "",
};

const WithdrawForm = () => {
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
  const [isLoadingWithdrawAll, setIsLoadingWithdrawALL] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | undefined>(
    undefined
  );
  console.log(
    "🚀 ~ file: WithdrawForm.tsx:35 ~ WithdrawForm ~ status:",
    status
  );

  const stakeBalance = useStakeBalance();

  const handleClick = async () => { 
    setStatus(undefined);
    setIsLoadingWithdrawALL(true);
    const exitHash = await exit();
    if (!exitHash) {
      setIsLoadingWithdrawALL(false);
      setStatus("error");
      return;
    }
    const isSuccess = await waitForOperation(exitHash);
    if (!isSuccess) {
      setIsLoadingWithdraw(false);
      setStatus("error");
      return;
    }
    setStatus("success");
    setIsLoadingWithdrawALL(false);
  };

  const handleSubmit = async (
    values: InitialValueType,
    { resetForm, setSubmitting }: FormikHelpers<InitialValueType>
  ) => {
    setStatus(undefined);
    setIsLoadingWithdraw(true);
    setSubmitting(true);

    const withdrawHash = await withdrawTokens(values.amount);
    if (!withdrawHash) {
      setIsLoadingWithdraw(false);
      setStatus("error");
      return;
    }
    const isSuccess = await waitForOperation(withdrawHash);
    if (!isSuccess) {
      setIsLoadingWithdraw(false);
      setStatus("error");
      return;
    }
    setSubmitting(false);
    setIsLoadingWithdraw(false);
    setStatus("success");
    resetForm();
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationWithdrawForm}
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
                  placeholder="Enter withdraw amount"
                  type="text"
                  name={"amount"}
                  aria-label="Withdraw"
                />
              )}
            </Field>
            <div className={styles.rateWrap}>
              <Rate
                label={"Available:"}
                rate={stakeBalance ? formatEther(stakeBalance) : "0"}
                unit={"STRU"}
              />
            </div>
            <div className={styles.form__buttonWrap}>
              <MainButton
                children={
                  <ButtonLoader text={"Withdraw"} isLoading={isLoadingWithdraw} />
                }
                type="submit"
                disabled={isSubmitting|| isLoadingWithdraw || isLoadingWithdrawAll}
                globalClassName={"linkButton"}
                localClassName={"form__button"}
                additionalClassName={"form__buttonTextWrap"}
              />
              <MainButton
                children={
                  <ButtonLoader
                    text={"withdraw all & Claim rewards"}
                    isLoading={isLoadingWithdrawAll}
                  />
                }
                type="button"
                disabled={ isLoadingWithdraw || isLoadingWithdrawAll}
                globalClassName={"linkButton"}
                localClassName={"form__aditionalButton"}
                additionalClassName={"form__buttonTextWrap"}
                onClick={handleClick}
              />
            </div>
          </Form>
        )}
      </Formik>
      {/* <MessageModal
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
            wrapperClass={isSendingToken ? "visibleSpinner" : "hiddenSpinner"}
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
      /> */}
    </>
  );
};

export default WithdrawForm;
