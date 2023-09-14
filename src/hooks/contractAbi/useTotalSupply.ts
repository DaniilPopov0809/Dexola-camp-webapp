import { useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const {VITE_CONTRACT_ADDRESS} = import.meta.env;

  const useTotalSupply = () => {
      // const { isConnected } = useAccount();
    const { data: totalSupply }  = useContractRead({
      address: VITE_CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: "totalSupply",
      watch: true,
    });
    return  BigInt(totalSupply as bigint);
  };

  export default useTotalSupply;