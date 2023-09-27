import {
  useAppContextValue,
  useMainContextValue,
} from "../../../hooks/useContextValue";
import { FormikHelpers } from "formik";
import { formatEther } from "viem";
import CommonForm from "../CommonForm/CommonForm";
import {
  approveTransaction,
  stakedTokens,
  waitForOperation,
} from "../../../helpers/operations";
import { useAllowance } from "../../../hooks/Abi";
import { validationStakeForm } from "../../../helpers/validation";
import { InitialValueType } from "../../../types";

const StakeForm = () => {
  const allowance = useAllowance();

  const context = useAppContextValue();
  const { struBalance, struBalanceMemo } = context;
  const { setInputValue } = context;

  const mainContext = useMainContextValue();
  const {
    isLoadingStake: isLoading,
    setIsLoadingStake: setIsLoading,
    setIsSendingToken,
    setIsApproving,
    setEndOperation,
    setErrorMesStake: setErrorMes,
    setStatusStake: setStatus,
    setAmountStru,
  } = mainContext;

  const initialValues: InitialValueType = {
    amount: "",
  };

  const handleSubmit = async (
    values: InitialValueType,
    { resetForm }: FormikHelpers<InitialValueType>
  ) => {
    setAmountStru(values.amount);
    setEndOperation(undefined);
    setIsLoading(true);
    setStatus(undefined);
    setIsApproving(false);
    setIsSendingToken(false);
    setErrorMes("");

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
    resetForm();
  };

  return (
    <>
      <CommonForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationForm={validationStakeForm}
        text={"stake"}
        struBalance={struBalanceMemo}
        fullStruBalance={struBalance?.formatted}
        isLoading={isLoading}
        isDisable={isLoading || !struBalance || struBalance.value === 0n}
        isShowInput={true}
        formName="stake"
      />
    </>
  );
};

export default StakeForm;
