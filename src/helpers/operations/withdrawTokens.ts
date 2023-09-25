import { parseEther } from "viem";
import { writeContract, prepareWriteContract, getAccount } from "@wagmi/core";
import contractAbi from "../../data/contractABI.json";
import { TypeHash, errorType } from "../../types";
const { VITE_CONTRACT_ADDRESS } = import.meta.env;

const withdrawTokens = async (
  amount: string
): Promise<errorType | TypeHash> => {
  try {
    const { isConnected } = getAccount();

    if (!isConnected) {
      throw new Error("Connect error!");
    }
    const config = await prepareWriteContract({
      address: VITE_CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: "withdraw",
      args: [parseEther(amount)],
    });
    const { hash } = await writeContract(config);
    return hash;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export default withdrawTokens;
