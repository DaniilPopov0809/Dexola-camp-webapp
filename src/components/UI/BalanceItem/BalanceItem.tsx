import { useAccount} from "wagmi";
import useWalletBalance from "../../../hooks/useWalletBalance";
import useViewportWidth from "../../../hooks/useViewportWidth";
import { roundUpBalance, shortAddress } from "../../../helpers/utils";
import styles from "./BalanceItem.module.scss";
import struLogo from "../../../images/struLogo.jpg";
import ethLogo from "../../../images/ethLogo.svg";
import { TokenStatus } from "../../../types";

const BalanceItem = () => {
  const viewportWidth = useViewportWidth();
  const { address } = useAccount();

  const struBalance = useWalletBalance(TokenStatus.Token);
  const ethBalance =  useWalletBalance(TokenStatus.NotToken);

  return (
    <>
      <img
        src={struLogo}
        width={24}
        height={24}
        alt="STRU logo"
        className={styles.struLogo}
      />
      {struBalance && (
        <span className={styles.struBalance}>{`${roundUpBalance(
          struBalance.formatted
        )} STRU`}</span>
      )}
      <img
        src={ethLogo}
        width={24}
        height={24}
        alt="ETH logo"
        className={styles.ethLogo}
      />
      {ethBalance && (
        <span className={styles.ethBalance}>{`${roundUpBalance(
          ethBalance.formatted
        )} ${ethBalance.symbol}`}</span>
      )}
      {viewportWidth > 743 && <span className={styles.separator}>|</span>}
      {viewportWidth > 743 && address && (
        <span className={styles.address}>{`${shortAddress(address)}`}</span>
      )}
    </>
  );
};

export default BalanceItem;
