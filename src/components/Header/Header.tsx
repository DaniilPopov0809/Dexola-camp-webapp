import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import Info from "../Info/Info";
import ButtonLoader from "../UI/ButtonLoader/ButtonLoader";
import BalanceEth from "../UI/BalanceItem/BalanceItem";
import MainButton from "../UI/MainButton/MainButton";
import logo from "../../images/logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const { open, isOpen } = useWeb3Modal();
  const { isConnected } = useAccount();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__wrap}`}>
        <div className={styles.header__links}>
        <a className={styles.header__linkLogo} href="/">
          <img src={logo} alt="logo" width={35} height={20} />
        </a>
        {isConnected ? (
          <MainButton
            onClick={() => open()}
            children={<BalanceEth />}
            globalClassName={"linkButton"}
            localClassName={"infoWallet"}
            additionalClassName={"infoWalletWrap"}
          />
        ) : (
          <MainButton
            onClick={() => open()}
            children={<ButtonLoader text="Connect wallet" isLoading={isOpen} />}
            globalClassName={"linkButton"}
            localClassName={"connectWallet"}
            additionalClassName={"connectWalletWrap"}
            disabled={isOpen}
          />
        )}
      </div>
      <Info/>
      </div>
    </header>
  );
};

export default Header;
