import { parseEther } from "viem";
import tokenAbi from "../../data/tokenABI.json";
import { writeContract, prepareWriteContract } from "@wagmi/core";
const { VITE_TOKEN_ADDRESS, VITE_CONTRACT_ADDRESS } = import.meta.env;
import { waitForOperation } from ".";

const approveTransaction = async (amount: string): Promise<boolean> => {
  try {
    const config = await prepareWriteContract({
      address: VITE_TOKEN_ADDRESS,
      abi: tokenAbi,
      functionName: "approve",
      args: [VITE_CONTRACT_ADDRESS, parseEther(amount)],
    });
    const { hash } = await writeContract(config);
    await waitForOperation(hash);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default approveTransaction;
