import { useAccount } from "wagmi";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import styles from "./ClaimRewards.module.scss";

const ClaimRewards = () => {
    const { isConnected } = useAccount();
    return (
        <section className={`container ${styles.stake}`}>
            {isConnected ? <h1>Hello</h1>  :<NoWalletConnect/>}
          
        </section>
       
    )
}

export default ClaimRewards;