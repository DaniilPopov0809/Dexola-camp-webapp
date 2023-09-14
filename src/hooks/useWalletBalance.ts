import { useAccount, useBalance } from "wagmi";
const {VITE_TOKEN_ADDRESS} = import.meta.env;



const useWalletBalance = (token: boolean)=> {
    const { address } = useAccount();
 
    const {data: balance} = useBalance({
        address: address,
        token: token? VITE_TOKEN_ADDRESS : "",
        watch: true,
      });

      return balance;
  }

export default useWalletBalance;