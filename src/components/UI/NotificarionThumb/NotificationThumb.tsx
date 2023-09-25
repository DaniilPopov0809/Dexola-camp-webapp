import { useMainContextValue } from "../../../hooks/useContextValue";
import Notification from "../Notification/Notification";
import styles from "./NotificationThumb.module.scss";

const NotificationThumb = () => {
  const mainContext = useMainContextValue();
  const {
    isSendingToken,
    isApproving,
    endOperation,
    errorMes,
    statusStake,
    statusReward,
    statusWithdraw,
    amountStru,
    isGettingWithdraw,
    isGettingReward,
  } = mainContext;

  return (
    <div className={styles.thumb}>
      <Notification
        title={!isSendingToken ? "Wait aproving..." : "Adding"}
        amount={!isSendingToken ? "" : `${amountStru} STRU`}
        text={!isSendingToken ? "" : "to Staking"}
        isVisible={isSendingToken || isApproving}
        titleStatus={
          endOperation === "stake" ? `${amountStru} STRU` : "Successfully"
        }
        textStatus={
          endOperation === "stake"
            ? "successfully added to Staking"
            : "approved"
        }
        errorMes={errorMes}
        status={statusStake}
      />
      <Notification
        title={"Withdrawing"}
        amount={amountStru ? `${amountStru} STRU` : "all STRU"}
        text={"without Stake"}
        isVisible={isGettingWithdraw}
        titleStatus={amountStru ? `${amountStru} STRU` : "All STRU"}
        textStatus={"successfully withdrawed"}
        errorMes={errorMes}
        status={statusWithdraw}
      />

      <Notification
        title={"Claiming"}
        text={"without Stake"}
        isVisible={isGettingReward}
        titleStatus={"Successfully"}
        textStatus={"climed reward"}
        errorMes={errorMes}
        status={statusReward}
      />
    </div>
  );
};

export default NotificationThumb;
