import { useMemo } from "react";
import { useAppContextValue } from "../../../hooks/useContextValue";
import useViewportWidth from "../../../hooks/useViewportWidth";
import { reduceDecimals, shortAddress } from "../../../helpers/utils";
import styles from "./BalanceItem.module.scss";
import struLogo from "../../../images/struLogo.jpg";
import ethLogo from "../../../images/ethLogo.svg";

const BalanceItem = () => {
  const viewportWidth = useViewportWidth();

  const context = useAppContextValue();
  const { struBalance, ethBalance } = context;
  const address = context?.account?.address;

  const { newAddress, reducedStruBalance, reducedEthBalance } = useMemo(() => {
    const newAddress = shortAddress(address ? address : "0.000");
    const reducedStruBalance = reduceDecimals(
      struBalance ? struBalance.formatted : "",
      3
    );
    const reducedEthBalance = reduceDecimals(
      ethBalance ? ethBalance.formatted : "0.000",
      3
    );

    return {
      newAddress,
      reducedStruBalance,
      reducedEthBalance,
    };
  }, [address, struBalance, ethBalance]);

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
        {struBalance ? `${reducedStruBalance} STRU` : "STRU not found"}
      </span>
      <img
        src={ethLogo}
        width={24}
        height={24}
        alt="ETH logo"
        className={styles.ethLogo}
      />
      {ethBalance && (
        <span className={styles.ethBalance}>{`${reducedEthBalance} ${
          ethBalance ? ethBalance.symbol : "ETH"
        }`}</span>
      )}
      {viewportWidth > 743 && <span className={styles.separator}>|</span>}
      {viewportWidth > 743 && address && (
        <span className={styles.address}>{newAddress}</span>
      )}
    </>
  );
};

export default BalanceItem;
