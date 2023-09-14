import { useAccount, usePrepareContractWrite  } from "wagmi";
import contractAbi from "../../data/contractABI.json";
import useWalletBalance from "../useWalletBalance";
const {VITE_CONTRACT_ADDRESS} = import.meta.env;
import { TokenStatus } from "../../types";

const useStakePreWrite = () => {
  const { address } = useAccount();
  const balance = useWalletBalance(TokenStatus.Token);

const { config } = usePrepareContractWrite({
    address: VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: 'approve',
    args: [address, balance]
  })
  return config;
};

export default useStakePreWrite;
