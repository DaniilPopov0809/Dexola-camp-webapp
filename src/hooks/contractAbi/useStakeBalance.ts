import { useAccount, useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const {VITE_CONTRACT_ADDRESS} = import.meta.env;

const useStakeBalance = () => {
  const { address, isConnected } = useAccount();
  const { data: balance }  = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: isConnected ? "balanceOf" : "",
    args: [address],
    watch: true,
  });
  return balance as bigint;
};

export default useStakeBalance;
