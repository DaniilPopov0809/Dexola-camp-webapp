import { useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const { VITE_CONTRACT_ADDRESS } = import.meta.env;

const useForwardsDuration = (): bigint => {
  const { data: rewards } = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "getRewardForDuration",
    watch: true,
  });
  return rewards as bigint;
};

export default useForwardsDuration;
