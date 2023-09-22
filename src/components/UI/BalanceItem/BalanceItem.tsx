import { useContextValue } from "../../../hooks/useContextValue";
import useViewportWidth from "../../../hooks/useViewportWidth";
import { reduceDecimals, shortAddress } from "../../../helpers/utils";
import styles from "./BalanceItem.module.scss";
import struLogo from "../../../images/struLogo.jpg";
import ethLogo from "../../../images/ethLogo.svg";

const BalanceItem = () => {
  const viewportWidth = useViewportWidth();

  const context = useContextValue();
  const struBalance = context?.struBalance;
  const ethBalance = context?.ethBalance;

  const account = context?.account;

  return (
    <>
      <img
        src={struLogo}
        width={24}
        height={24}
        alt="STRU logo"
        className={styles.struLogo}
      />

      <span className={styles.struBalance}>
        {struBalance
          ? `${reduceDecimals(struBalance.formatted, 3)} STRU`
          : "STRU not found"}
      </span>
      <img
        src={ethLogo}
        width={24}
        height={24}
        alt="ETH logo"
        className={styles.ethLogo}
      />
      {ethBalance && (
        <span className={styles.ethBalance}>{`${reduceDecimals(
          ethBalance.formatted,
          3
        )} ${ethBalance ? ethBalance.symbol : "ETH"}`}</span>
      )}
      {viewportWidth > 743 && <span className={styles.separator}>|</span>}
      {viewportWidth > 743 && account?.address && (
        <span className={styles.address}>{`${shortAddress(
          account.address
        )}`}</span>
      )}
    </>
  );
};

export default BalanceItem;
