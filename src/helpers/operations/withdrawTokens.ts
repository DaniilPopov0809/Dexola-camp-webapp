import { parseEther } from "viem";
import { writeContract, prepareWriteContract } from "@wagmi/core";
import contractAbi from "../../data/contractABI.json";
import { TypeHash } from "../../types";
const { VITE_CONTRACT_ADDRESS } = import.meta.env;

const withdrawTokens = async(amount: string): Promise<undefined | TypeHash> => {
  try {
    const config = await prepareWriteContract({
      address: VITE_CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: "withdraw",
      args: [parseEther(amount)],
    });
    const { hash } = await writeContract(config);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

export default withdrawTokens;
