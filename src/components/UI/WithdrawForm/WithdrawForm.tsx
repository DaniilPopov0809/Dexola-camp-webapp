import { FormikHelpers } from "formik";
import { formatEther } from "viem";
import MainButton from "../MainButton/MainButton";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import CommonForm from "../CommonForm/CommonForm";
import {
  useAppContextValue,
  useMainContextValue,
} from "../../../hooks/useContextValue";
import {
  withdrawTokens,
  waitForOperation,
  exit,
} from "../../../helpers/operations";
import { validationWithdrawForm } from "../../../helpers/validation";
import { InitialValueType } from "../../../types";

const initialValues: InitialValueType = {
  amount: "",
};

const WithdrawForm = () => {
  const { stakeBalance, stakeBalanceMemo } = useAppContextValue();

  const mainContext = useMainContextValue();
  const {
    isLoadingWithdraw,
    setIsLoadingWithdraw,
    isLoadingWithdrawAll,
    setIsLoadingWithdrawAll,
    setIsGettingWithdraw,
    setStatusWithdraw: setStatus,
    setAmountStru,
    setErrorMesWithdraw:setErrorMes,
  } = mainContext;

  const formattedStakeBalance = stakeBalance
    ? formatEther(stakeBalance)
    : "0.00";

  const handleClick = async () => {
    setStatus(undefined);
    setAmountStru("");
    setErrorMes("");
    setIsLoadingWithdrawAll(true);

    const exitHash = await exit();
    if (typeof exitHash === "object") {
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
    { resetForm }: FormikHelpers<InitialValueType>
  ) => {
    setAmountStru(values.amount);
    setStatus(undefined);
    setIsLoadingWithdraw(true);
    setErrorMes("");

    const withdrawHash = await withdrawTokens(values.amount);
    if (typeof withdrawHash === "object") {
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
    setIsLoadingWithdraw(false);
    setIsGettingWithdraw(false);
    setStatus("success");
    resetForm();
  };

  const isDisable =
    isLoadingWithdraw ||
    isLoadingWithdrawAll ||
    !stakeBalance ||
    stakeBalance === 0n;
  return (
    <>
      <CommonForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationForm={validationWithdrawForm}
        text={"withdraw"}
        struBalance={stakeBalanceMemo}
        fullStruBalance={formattedStakeBalance}
        isLoading={isLoadingWithdraw}
        isDisable={isDisable}
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
            disabled={isDisable}
            globalClassName={"linkButton"}
            localClassName={"form__aditionalButton"}
            additionalClassName={"form__buttonTextWrap"}
            onClick={handleClick}
          />
        }
      />
    </>
  );
};

export default WithdrawForm;
