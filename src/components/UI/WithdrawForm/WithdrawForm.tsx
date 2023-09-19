import { useState } from "react";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { formatEther } from "viem";
import Rate from "../Rate/Rate";
import MainButton from "../MainButton/MainButton";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import MessageModal from "../MessageModal/MessageModal";
import TextMessageModall from "../TextMessageModal/TextMessageModal";
import MessageIcon from "../MessageIcon/MessageIcon";
import FieldInput from "../FieldInput/FieldInput";
import {
  withdrawTokens,
  waitForOperation,
  exit,
} from "../../../helpers/operations";
import { useStakeBalance } from "../../../hooks/Abi";
import { validationWithdrawForm } from "../../../helpers/validation";
import { Oval } from "react-loader-spinner";
import { InitialValueType } from "../../../types";
import { reduceDecimals } from "../../../helpers/utils";

import errorCross from "../../../images/errorCross.svg";
import successCheck from "../../../images/successCheck.svg";

const initialValues: InitialValueType = {
  amount: "",
};

const WithdrawForm = () => {
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
  const [isLoadingWithdrawAll, setIsLoadingWithdrawAll] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [amountStru, setAmountStru] = useState("");

  const stakeBalance = useStakeBalance();

  const handleClick = async () => {
    setStatus(undefined);
    setAmountStru("")
    setIsLoadingWithdrawAll(true);
    const exitHash = await exit();
    if (!exitHash) {
      setIsLoadingWithdrawAll(false);
      setStatus("error");
      return;
    }
    setIsGetting(true);
    const isSuccess = await waitForOperation(exitHash);
    if (!isSuccess) {
      setIsLoadingWithdrawAll(false);
      setIsGetting(false);
      setStatus("error");
      return;
    }
    setIsGetting(false);
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
    setSubmitting(true);

    const withdrawHash = await withdrawTokens(values.amount);
    if (!withdrawHash) {
      setIsLoadingWithdraw(false);
      setStatus("error");
      return;
    }
    setIsGetting(true);
    const isSuccess = await waitForOperation(withdrawHash);
    if (!isSuccess) {
      setIsLoadingWithdraw(false);
      setIsGetting(false);
      setStatus("error");
      return;
    }
    setSubmitting(false);
    setIsLoadingWithdraw(false);
    setIsGetting(false);
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
      </Formik>
      <MessageModal
        text={
          <TextMessageModall
            title={"Withdrawing"}
            amount={amountStru? `${amountStru} STRU`: "all STRU"}
            text={"without Stake"}
          />
        }
        children={
          <Oval
            height={32}
            width={32}
            color="#20FE51"
            wrapperStyle={{ marginRight: "8px" }}
            wrapperClass={
              isGetting ? "visibleSpinner" : "hiddenSpinner"
            }
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
              title={amountStru ?`${amountStru} STRU`: "All STRU"}
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
      />
    </>
  );
};

export default WithdrawForm;
