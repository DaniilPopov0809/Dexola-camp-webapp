import { parseEther } from "viem";
import tokenAbi from "../../data/tokenABI.json";
import { writeContract, prepareWriteContract, getAccount } from "@wagmi/core";
const { VITE_TOKEN_ADDRESS, VITE_CONTRACT_ADDRESS } = import.meta.env;
import { TypeHash, errorType } from "../../types";

const approveTransaction = async (
  amount: string
): Promise<errorType | TypeHash> => {
  try {
    const { isConnected } = getAccount();

    if (!isConnected) {
      throw new Error("Connect error!");
    }
    const config = await prepareWriteContract({
      address: VITE_TOKEN_ADDRESS,
      abi: tokenAbi,
      functionName: "approve",
      args: [VITE_CONTRACT_ADDRESS, parseEther(amount)],
    });
    const { hash } = await writeContract(config);

    return hash;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export default approveTransaction;
