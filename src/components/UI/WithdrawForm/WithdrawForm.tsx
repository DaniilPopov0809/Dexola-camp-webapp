import { useState } from "react";
// import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { FormikHelpers } from "formik";
import { formatEther } from "viem";

// import Rate from "../Rate/Rate";
import MainButton from "../MainButton/MainButton";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import CommonForm from "../CommonForm/CommonForm";
import OperationFeedbackSection from "../OperationFeedbackSection/OperationFeedbackSection";
// import MessageModal from "../MessageModal/MessageModal";
// import TextMessageModall from "../TextMessageModal/TextMessageModal";
// import MessageIcon from "../MessageIcon/MessageIcon";
// import FieldInput from "../FieldInput/FieldInput";
import { useContextValue } from "../../../hooks/useContextValue";
import {
  withdrawTokens,
  waitForOperation,
  exit,
} from "../../../helpers/operations";
import { validationWithdrawForm } from "../../../helpers/validation";
// import { Oval } from "react-loader-spinner";
import { InitialValueType } from "../../../types";
// import { reduceDecimals } from "../../../helpers/utils";

// import errorCross from "../../../images/errorCross.svg";
// import successCheck from "../../../images/successCheck.svg";

const initialValues: InitialValueType = {
  amount: "",
};

const WithdrawForm = () => {
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
  const [isLoadingWithdrawAll, setIsLoadingWithdrawAll] = useState(false);
  const [isGettingWithdraw, setIsGettingWithdraw] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [amountStru, setAmountStru] = useState("");
  const [errorMes, setErrorMes] = useState("");

  const stakeBalance =  useContextValue().stakeBalance;

  const handleClick = async () => {
    setStatus(undefined);
    setAmountStru("");
    setErrorMes("");
    setIsLoadingWithdrawAll(true);

    const exitHash = await exit();
    if (typeof exitHash === "object"){
      setErrorMes(exitHash.error); 
      setIsLoadingWithdrawAll(false);
      setStatus("error");
      return;
    }
    setIsGettingWithdraw(true);
    const isSuccess = await waitForOperation(exitHash);
    if (!isSuccess) {
      setIsLoadingWithdrawAll(false);
      setIsGettingWithdraw(false);
      setStatus("error");
      return;
    }
    setIsGettingWithdraw(false);
    setStatus("success");
    setIsLoadingWithdrawAll(false);
  };

  const handleSubmit = async (
    values: InitialValueType,
    { resetForm, setSubmitting }: FormikHelpers<InitialValueType>
  ) => {
    setAmountStru(values.amount);
    setStatus(undefined);
    setIsLoadingWithdraw(true);
    setErrorMes("");
    setSubmitting(true);

    const withdrawHash = await withdrawTokens(values.amount);
    if (typeof withdrawHash === "object"){
      setErrorMes(withdrawHash.error); 
      setIsLoadingWithdraw(false);
      setStatus("error");
      return;
    }
    setIsGettingWithdraw(true);
    const isSuccess = await waitForOperation(withdrawHash);
    if (!isSuccess) {
      setIsLoadingWithdraw(false);
      setIsGettingWithdraw(false);
      setStatus("error");
      return;
    }
    setSubmitting(false);
    setIsLoadingWithdraw(false);
    setIsGettingWithdraw(false);
    setStatus("success");
    resetForm();
  };
  return (
    <>
      <CommonForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationForm={validationWithdrawForm}
        text={"withdraw"}
        struBalance={stakeBalance ? formatEther(stakeBalance) : undefined}
        isLoading={isLoadingWithdraw}
        isDisable={isLoadingWithdraw || isLoadingWithdrawAll || !stakeBalance}
        isShowInput={true}
        children={
          <MainButton
            children={
              <ButtonLoader
                text={"withdraw all & Claim rewards"}
                isLoading={isLoadingWithdrawAll}
              />
            }
            type="button"
            disabled={
              isLoadingWithdraw ||
              isLoadingWithdrawAll ||
              !stakeBalance ||
              stakeBalance === 0n
            }
            globalClassName={"linkButton"}
            localClassName={"form__aditionalButton"}
            additionalClassName={"form__buttonTextWrap"}
            onClick={handleClick}
          />
        }
      />
      <OperationFeedbackSection
        title={"Withdrawing"}
        amount={amountStru ? `${amountStru} STRU` : "all STRU"}
        text={"without Stake"}
        isVisible={isGettingWithdraw}
        titleStatus={amountStru ? `${amountStru} STRU` : "All STRU"}
        textStatus={"successfully withdrawed"}
        errorMes={errorMes}
        status={status}
      />

      {/* <Formik
        initialValues={initialValues}
        validationSchema={validationWithdrawForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
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
            <div className="form__rateWrap">
              <Rate
                label={"Available:"}
                rate={
                  stakeBalance
                    ? reduceDecimals(formatEther(stakeBalance), 2)
                    : "0.00"
                }
                unit={"STRU"}
                isTitle={false}
              />
            </div>
            <div className="form__buttonWrap">
              <MainButton
                children={
                  <ButtonLoader
                    text={"Withdraw"}
                    isLoading={isLoadingWithdraw}
                  />
                }
                type="submit"
                disabled={
                  isSubmitting || isLoadingWithdraw || isLoadingWithdrawAll || !stakeBalance
                }
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
                disabled={isLoadingWithdraw || isLoadingWithdrawAll || !stakeBalance}
                globalClassName={"linkButton"}
                localClassName={"form__aditionalButton"}
                additionalClassName={"form__buttonTextWrap"}
                onClick={handleClick}
              />
            </div>
          </Form>
        )}
      </Formik> */}
      {/* <MessageModal
        text={
          <TextMessageModall
            title={"Withdrawing"}
            amount={amountStru ? `${amountStru} STRU` : "all STRU"}
            text={"without Stake"}
          />
        }
        children={
          <Oval
            height={32}
            width={32}
            color="#20FE51"
            wrapperStyle={{ marginRight: "8px" }}
            wrapperClass={isGetting ? "visibleSpinner" : "hiddenSpinner"}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#6E758B"
            strokeWidth={8}
            strokeWidthSecondary={8}
          />
        }
        isLoading={isGetting}
      />
      <MessageModal
        text={
          status === "success" ? (
            <TextMessageModall
              title={amountStru ? `${amountStru} STRU` : "All STRU"}
              text={"successfully withdrawed"}
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
