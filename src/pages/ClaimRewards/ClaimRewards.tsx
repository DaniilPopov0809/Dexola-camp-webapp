import { useAccount } from "wagmi";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import ClaimRewardForm from "../../components/UI/ClaimRewardForm/ClaimRewardForm";
import Title from "../../components/UI/Title/Title";
// import styles from "./Withdraw.module.scss";

const ClaimRewards = () => {
  const { isConnected } = useAccount();
  return (
    <section className="container mainSection">
      {isConnected ? (
        <div className="mainSection__formWrap">
          <Title
            text={"Claim rewards"}
            globalClassName={"title__h2"}
            titleTag={"h2"}
            localClassName={"appForm"}
          />
          <ClaimRewardForm />
        </div>
      ) : (
        <NoWalletConnect />
      )}
    </section>
  );
};

export default ClaimRewards;
