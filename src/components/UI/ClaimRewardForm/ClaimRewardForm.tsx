import { FormikHelpers } from "formik";
import { formatEther } from "viem";
import {
  useAppContextValue,
  useMainContextValue,
} from "../../../hooks/useContextValue";

import CommonForm from "../CommonForm/CommonForm";
import { claimReward, waitForOperation } from "../../../helpers/operations";
import { reduceDecimals } from "../../../helpers/utils";
import { InitialValueType } from "../../../types";

const initialValues: InitialValueType = {
  amount: "",
};

const ClaimRewardForm = () => {
  const { earned } = useAppContextValue();

  const mainContext = useMainContextValue();
  const {
    isLoadingReward: isLoading,
    setIsLoadingReward: setIsLoading,
    setIsGettingReward,
    setErrorMes,
    setStatusReward: setStatus,
  } = mainContext;

  const formattedEarned = earned ? formatEther(earned) : "0.00";
  const reducedEarned = reduceDecimals(formattedEarned, 2);

  const handleSubmit = async (
    _values: InitialValueType,
    { resetForm, setSubmitting }: FormikHelpers<InitialValueType>
  ) => {
    setStatus(undefined);
    setIsLoading(true);
    setErrorMes("");
    setSubmitting(true);

    const claimRewardsHash = await claimReward();
    if (typeof claimRewardsHash === "object") {
      setIsLoading(false);
      setStatus("error");
      setErrorMes(claimRewardsHash.error);
      return;
    }
    setIsGettingReward(true);
    const isSuccess = await waitForOperation(claimRewardsHash);
    if (!isSuccess) {
      setIsLoading(false);
      setIsGettingReward(false);
      setStatus("error");
      return;
    }
    setSubmitting(false);
    setIsLoading(false);
    setIsGettingReward(false);
    setStatus("success");
    resetForm();
  };

  return (
    <>
      <CommonForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationForm={false}
        text={"claim rewards"}
        struBalance={reducedEarned}
        fullStruBalance={formattedEarned}
        isLoading={isLoading}
        isDisable={!earned || +formatEther(earned) === 0 || isLoading}
        isShowInput={false}
        cls={"rewards__reteWrap"}
      />
    </>
  );
};

export default ClaimRewardForm;
