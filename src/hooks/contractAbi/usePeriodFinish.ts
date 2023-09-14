import { useAccount, useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const {VITE_CONTRACT_ADDRESS} = import.meta.env;

const usePeriodFinish = (): bigint => {
  const { isConnected } = useAccount();
  const { data: periodFinish } = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: isConnected?  "periodFinish": "",
    watch: true,
  });
  return BigInt(periodFinish as bigint);
};

export default usePeriodFinish;
