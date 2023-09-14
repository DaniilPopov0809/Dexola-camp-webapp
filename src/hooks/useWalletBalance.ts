import { useAccount, useBalance } from "wagmi";
const {VITE_TOKEN_ADDRESS} = import.meta.env;
import { TokenStatus } from "../types";

const useWalletBalance = (isToken: TokenStatus)=> {
    const { address } = useAccount();
 
    const {data: balance} = useBalance({
        address: address,
        token:  isToken === TokenStatus.Token ? VITE_TOKEN_ADDRESS : "",
        watch: true,
      });

      return balance;
  }

export default useWalletBalance;