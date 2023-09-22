import { useContextValue } from "../../hooks/useContextValue";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import WithdrawForm from "../../components/UI/WithdrawForm/WithdrawForm";
import Title from "../../components/UI/Title/Title";
// import styles from "./Withdraw.module.scss";

const Withdraw = () => {
  const context = useContextValue();
  const isConnected = context?.account?.isConnected;
    return(
        <section className="container mainSection">
        {isConnected ? (
          <div className="mainSection__formWrap">
            <Title
              text={"Withdraw"}
              globalClassName={"title__h2"}
              titleTag={"h2"}
              localClassName={"appForm"}
            />
            <WithdrawForm />
          </div>
        ) : (
          <NoWalletConnect />
        )}
      </section>
    )
   
}

export default Withdraw;