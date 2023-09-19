import { useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const {VITE_CONTRACT_ADDRESS} = import.meta.env;

const usePeriodFinish = (): bigint => {
  const { data: periodFinish } = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "periodFinish",
    watch: true,
  });
  return periodFinish as bigint;
};

export default usePeriodFinish;
