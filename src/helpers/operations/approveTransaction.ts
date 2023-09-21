import { parseEther } from "viem";
import tokenAbi from "../../data/tokenABI.json";
import { writeContract, prepareWriteContract } from "@wagmi/core";
const { VITE_TOKEN_ADDRESS, VITE_CONTRACT_ADDRESS } = import.meta.env;
import { TypeHash } from "../../types";

const approveTransaction = async (amount: string): Promise<undefined | TypeHash> => {
  try {
    const config = await prepareWriteContract({
      address: VITE_TOKEN_ADDRESS,
      abi: tokenAbi,
      functionName: "approve",
      args: [VITE_CONTRACT_ADDRESS, parseEther(amount)],
    });
    const { hash } = await writeContract(config);
    
    return hash;
  } catch (error) {
    console.log(error);
  }
};

export default approveTransaction;
