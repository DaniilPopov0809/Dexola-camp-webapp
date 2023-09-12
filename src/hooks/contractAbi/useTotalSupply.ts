import {useAccount, useContractRead } from "wagmi";
import contractAbi from "../../data/contractABI.json";
const VITE_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const useTotalSupply = () => {
    const { isConnected } = useAccount();
  const { data: totalSupply }  = useContractRead({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: isConnected ? "totalSupply": "",
    watch: true,
  });
  return  (totalSupply as bigint);
};

export default useTotalSupply;