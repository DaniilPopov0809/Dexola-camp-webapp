import { useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const {VITE_CONTRACT_ADDRESS} = import.meta.env;

const useRewardRate = () => {
  const { data: rewardRate }  = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "rewardRate",
    watch: true,
  });
  return  BigInt(rewardRate as bigint);
};

export default useRewardRate;