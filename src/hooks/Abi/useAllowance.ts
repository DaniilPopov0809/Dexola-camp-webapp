import { useAccount, useContractRead } from "wagmi";
import tokenAbi from "../../data/tokenABI.json";
const { VITE_CONTRACT_ADDRESS, VITE_TOKEN_ADDRESS } = import.meta.env;

const useAllowance = (): bigint => {
  const { address } = useAccount();
  const { data } = useContractRead({
    address: VITE_TOKEN_ADDRESS,
    abi: tokenAbi,
    functionName: "allowance",
    args: [address, VITE_CONTRACT_ADDRESS],
    watch: true,
  });
  return data as bigint;
};

export default useAllowance;
