import { useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const { VITE_CONTRACT_ADDRESS } = import.meta.env;

const useRewardRate = (): bigint => {
  const { data: rewardRate } = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "rewardRate",
    watch: true,
  });
  return rewardRate as bigint;
};

export default useRewardRate;
