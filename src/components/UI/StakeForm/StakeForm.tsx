import { useMemo } from "react";
import {
  useAppContextValue,
  useMainContextValue,
} from "../../../hooks/useContextValue";
// import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { FormikHelpers } from "formik";
import { formatEther } from "viem";
import CommonForm from "../CommonForm/CommonForm";
import OperationFeedbackSection from "../OperationFeedbackSection/OperationFeedbackSection";
// import Rate from "../Rate/Rate";
// import MainButton from "../MainButton/MainButton";
// import ButtonLoader from "../ButtonLoader/ButtonLoader";
// import MessageModal from "../MessageModal/MessageModal";
// import TextMessageModall from "../TextMessageModal/TextMessageModal";
// import MessageIcon from "../MessageIcon/MessageIcon";
// import FieldInput from "../FieldInput/FieldInput";
import { reduceDecimals } from "../../../helpers/utils";
import {
  approveTransaction,
  stakedTokens,
  waitForOperation,
} from "../../../helpers/operations";
import { useAllowance } from "../../../hooks/Abi";
import { validationStakeForm } from "../../../helpers/validation";
// import { Oval } from "react-loader-spinner";
import { InitialValueType } from "../../../types";
// import errorCross from "../../../images/errorCross.svg";
// import successCheck from "../../../images/successCheck.svg";

const StakeForm = () => {
  // const [allowance, setAllowance] = useState(0n);
  // const [isLoading, setIsLoading] = useState(false);
  // const [status, setStatus] = useState<"success" | "error" | undefined>(
  //   undefined
  // );
  // const [amountStru, setAmountStru] = useState("");
  // const [isSendingToken, setIsSendingToken] = useState(false);
  // const [isApproving, setIsApproving] = useState(false);
  // const [endOperation, setEndOperation] = useState<
  //   "stake" | "approve" | undefined
  // >(undefined);
  // const [errorMes, setErrorMes] = useState("");
  const allowance = useAllowance();

  const context = useAppContextValue();
  const {struBalance} = context;
  const {setInputValue} = context;

  const mainContext = useMainContextValue();
  const {
    isLoadingStake: isLoading,
    setIsLoadingStake: setIsLoading,
    isSendingToken,
    setIsSendingToken,
    isApproving,
    setIsApproving,
    endOperation,
    setEndOperation,
    errorMes,
    setErrorMes,
    statusStake: status,
    setStatusStake: setStatus,
    amountStru,
    setAmountStru,
  } = mainContext;

  // const setSubmitting = mainContext.setIsSubmitting

  const reducedStruBalance = useMemo(
    () => reduceDecimals(struBalance ? struBalance.formatted : "0.00", 2),
    [struBalance]
  );

  const initialValues: InitialValueType = {
    amount: "",
  };

  const handleSubmit = async (
    values: InitialValueType,
    { resetForm }: FormikHelpers<InitialValueType>
  ) => {
    // setCurrentTable(true);
    setAmountStru(values.amount);
    setEndOperation(undefined);
    setIsLoading(true);
    setStatus(undefined);
    setIsApproving(false);
    setIsSendingToken(false);
    setErrorMes("");
    // setSubmitting(true);

    const allowanceToNumber = +formatEther(allowance);

    if (allowanceToNumber < +values.amount) {
      const approveHash = await approveTransaction(values.amount);

      if (typeof approveHash === "object") {
        setErrorMes(approveHash.error);
        setIsSendingToken(false);
        setIsLoading(false);
        setStatus("error");
        return;
      }
      setIsApproving(true);
      const isSuccessApprove = await waitForOperation(approveHash);

      if (!isSuccessApprove) {
        setIsApproving(false);
        setIsLoading(false);
        setStatus("error");
        return;
      }
      setStatus("success");
      setIsApproving(false);
      setEndOperation("approve");
    }

    const stakeHash = await stakedTokens(values.amount);
    setEndOperation(undefined);
    setErrorMes("");
    setStatus(undefined);
    if (typeof stakeHash === "object") {
      setErrorMes(stakeHash.error);
      setIsSendingToken(false);
      setIsLoading(false);
      setStatus("error");
      return;
    }
    setIsSendingToken(true);
    const isSuccessStake = await waitForOperation(stakeHash);
    if (!isSuccessStake) {
      setIsSendingToken(false);
      setIsLoading(false);
      setStatus("error");
      return;
    }
    setInputValue("");
    setIsSendingToken(false);
    setIsLoading(false);
    setStatus("success");
    setEndOperation("stake");
    // setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <CommonForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationForm={validationStakeForm}
        text={"stake"}
        struBalance={reducedStruBalance}
        fullStruBalance={struBalance?.formatted}
        isLoading={isLoading}
        isDisable={isLoading || !struBalance || struBalance.value === 0n}
        isShowInput={true}
        formName="stake"
      />
      <OperationFeedbackSection
        title={!isSendingToken ? "Approving operation" : "Adding"}
        amount={!isSendingToken ? "" : `${amountStru} STRU`}
        text={!isSendingToken ? "" : "to Staking"}
        isVisible={isSendingToken || isApproving}
        titleStatus={
          endOperation === "stake" ? `${amountStru} STRU` : "Successfully"
        }
        textStatus={
          endOperation === "stake"
            ? "successfully added to Staking"
            : "approve"
        }
        errorMes={errorMes}
        status={status}
      />

      {/* <Formik
        initialValues={initialValues}
        validationSchema={validationStakeForm}
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
                  placeholder="Enter stake amount"
                  type="text"
                  name={"amount"}
                  aria-label="Stake amount"
                />
              )}
            </Field>
            <div className="form__rateWrap">
              <Rate
                label={"Available:"}
                rate={
                  struBalance
                    ? reduceDecimals(struBalance.formatted, 2)
                    : "0.00"
                }
                unit={"STRU"}
                isTitle={false}
              />
            </div>
            <div className="form__buttonWrap">
              <MainButton
                children={<ButtonLoader text={"Stake"} isLoading={isLoading} />}
                type="submit"
                disabled={isSubmitting || !struBalance}
                globalClassName={"linkButton"}
                localClassName={"form__button"}
                additionalClassName={"form__buttonTextWrap"}
              />
            </div>
          </Form>
        )}
      </Formik> */}
      {/* <MessageModal
        text={
          <TextMessageModall
            title={!isSendingToken ? "Approving" : "Adding"}
            amount={!isSendingToken ? "" : `${amountStru} STRU`}
            text={!isSendingToken ? "" : "to Staking"}
          />
        }
        children={
          <Oval
            height={32}
            width={32}
            color="#20FE51"
            wrapperStyle={{ marginRight: "8px" }}
            wrapperClass={
              isSendingToken || isApproving ? "visibleSpinner" : "hiddenSpinner"
            }
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#6E758B"
            strokeWidth={8}
            strokeWidthSecondary={8}
          />
        }
        isLoading={isSendingToken || isApproving}
      />
      <MessageModal
        text={
          status === "success" ? (
            <TextMessageModall
              title={
                endOperation === "stake" ? `${amountStru} STRU` : "Approve"
              }
              text={
                endOperation === "stake"
                  ? "successfully added to Staking"
                  : "successfully"
              }
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

export default StakeForm;
