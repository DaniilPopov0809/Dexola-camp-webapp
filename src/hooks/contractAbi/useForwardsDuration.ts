import { useAccount, useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const VITE_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const useForwardsDuration = (): bigint => {
  const { isConnected } = useAccount();
  const { data: rewards } = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: isConnected ? "getRewardForDuration": "",
    watch: true,
  });
  return rewards as bigint;
};

export default useForwardsDuration;
