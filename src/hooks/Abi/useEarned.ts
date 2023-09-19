import { useAccount, useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const {VITE_CONTRACT_ADDRESS} = import.meta.env;

const useEarned = ():bigint => {
  const { address, isConnected } = useAccount();
  const { data: earned }  = useContractRead({
   address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: isConnected ? "earned": "",
    args: [address],
    watch: true,
  });
  return earned as bigint;
};

export default useEarned;