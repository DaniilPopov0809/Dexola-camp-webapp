import { useWeb3Modal } from "@web3modal/react";
import crossIcon from "../../../images/circleCross.svg";
import walletIcon from "../../../images/wallet.svg";
import styles from "./NoWalletConnect.module.scss";
import MainButton from "../MainButton/MainButton";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const NoWalletConnect = () => {
  const { open, isOpen } = useWeb3Modal();
  return (
    <div className={styles.noWalletConnect}>
      <div className={styles.noWalletConnect__imageWrap}>
        <img width={64} height={64} src={walletIcon} alt="Wallet icon" />
        <img
          width={28}
          height={28}
          src={crossIcon}
          alt="Circle cross icon"
          className={styles.noWalletConnect__crossIcon}
        />
      </div>

      <p className={styles.noWalletConnect_description}>
        To start staking you need to connect you wallet first
      </p>

      <MainButton
        onClick={() => open()}
        children={<ButtonLoader text="Connect wallet" isLoading={isOpen} />}
        globalClassName={"linkButton"}
        localClassName={"noConnectWallet"}
        additionalClassName={"connectWalletWrap"}
        disabled={isOpen}
      />
    </div>
  );
};

export default NoWalletConnect;
