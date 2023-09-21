import { useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const { VITE_CONTRACT_ADDRESS } = import.meta.env;

const useTotalSupply = ():bigint => {
  const { data: totalSupply} = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "totalSupply",
    watch: true,
  });
    return totalSupply as bigint;
};

export default useTotalSupply;
