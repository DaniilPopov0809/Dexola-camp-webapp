import { useAccount, useBalance } from "wagmi";
import useViewportWidth from "../../../hooks/useViewportWidth";
import roundUpBalance from "../../../helpers/roundUpBalance";
import shortAddress from "../../../helpers/shortAddress";
import styles from "./BalanceItem.module.scss";
import struLogo from "../../../images/struLogo.jpg";
import ethLogo from "../../../images/ethLogo.svg";

const BalanceEth = () => {
  const viewportWidth = useViewportWidth();
  const { address } = useAccount();

  const struBalance = useBalance({
    address: address,
    token: "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83",
    watch: true,
  });

  const ethBalance = useBalance({
    address: address,
    watch: true,
  });

  return (
    <>
      <img
        src={struLogo}
        width={24}
        height={24}
        alt="STRU logo"
        className={styles.struLogo}
      />
      {struBalance.data && (
        <span className={styles.struBalance}>{`${roundUpBalance(
          struBalance.data.formatted
        )} STRU`}</span>
      )}
      <img
        src={ethLogo}
        width={24}
        height={24}
        alt="ETH logo"
        className={styles.ethLogo}
      />
      {ethBalance.data && (
        <span className={styles.ethBalance}>{`${roundUpBalance(
          ethBalance.data.formatted
        )} ETH`}</span>
      )}
      {viewportWidth > 743 && <span className={styles.separator}>|</span>}
      {viewportWidth > 743 && address && (
        <span className={styles.address}>{`${shortAddress(address)}`}</span>
      )}
    </>
  );
};

export default BalanceEth;
