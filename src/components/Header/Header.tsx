import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

import BalanceBar from "../UI/BalanceBar/BalanceBar";
import MainButton from "../UI/MainButton/MainButton";
import logo from "../../images/logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__wrap}`}>
        <a className={styles.header__linkLogo} href="/">
          <img src={logo} alt="logo" width={35} height={20} />
        </a>
        {isConnected ? (
          <BalanceBar />
        ) : (
          <MainButton
            onClick={() => open()}
            title={"Connect wallet"}
            globalClassName={"linkButton"}
            localClassName={"connectWallet"}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
