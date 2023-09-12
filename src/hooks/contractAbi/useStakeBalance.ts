import { useAccount, useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const VITE_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const useStakeBalance = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  return isConnected ? balance : 0;
};

export default useStakeBalance;
