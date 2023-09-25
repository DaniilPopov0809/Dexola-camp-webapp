import { useWeb3Modal } from "@web3modal/react";
import { useAppContextValue } from "../../hooks/useContextValue";
import Info from "../UI/Info/Info";
import ButtonLoader from "../UI/ButtonLoader/ButtonLoader";
import BalanceItem from "../UI/BalanceItem/BalanceItem";
import MainButton from "../UI/MainButton/MainButton";
import NavigationMenu from "../../components/UI/NavigationMenu/NavigationMenu";
import logo from "../../images/logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const { open, isOpen } = useWeb3Modal();
  const isConnected = useAppContextValue().account?.isConnected;

  return (
    <header className={styles.header}>
      <div className={`additionalСontainer ${styles.header__links}`}>
        <a className={styles.header__linkLogo} href="/">
          <img src={logo} alt="logo" width={35} height={20} />
        </a>
        {isConnected ? (
          <MainButton
            onClick={() => open()}
            children={<BalanceItem />}
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
      <Info />
      <NavigationMenu />
    </header>
  );
};

export default Header;
