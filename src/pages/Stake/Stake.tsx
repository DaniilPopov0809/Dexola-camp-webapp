import { useAccount } from "wagmi";
import NoWalletConnect from "../../components/UI/NoWalletConnect/NoWalletConnect";
import styles from "./Stake.module.scss";

const Stake = () => {
    const { isConnected } = useAccount();
    return (
        <section className={`container ${styles.stake}`}>
            {isConnected ? <h1>Hello</h1>  :<NoWalletConnect/>}
          
        </section>
       
    )
}

export default Stake;