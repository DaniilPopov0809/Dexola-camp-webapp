import styles from "./BalanceBar.module.scss";
import { useAccount, useBalance, useContractRead } from "wagmi";
import ABI from "../../../data/contractABI.json";
import convertStru from "../../../helpers/converStru";

const BalanceBar = () => {

    const { address } = useAccount();

    const { data } = useBalance({
      address: address,
    });
  
  
    const { data: balance }:{ data: bigint | undefined }= useContractRead({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "balanceOf",
      args: [address],
      watch: true,
    });

    return (
        <div className={styles.balanceBar}>
            <div>
                <img src="" alt="Logo Stru" />
                {balance !== undefined && <p>{`${convertStru(balance)} STRU`}</p>}
            </div>
            <div>
                <img src="" alt="Logo ETH" />
                <p>{`${data?.formatted}ETH | ${address}`}</p>
            </div>
        </div>
    )
}

export default BalanceBar;