import { writeContract, prepareWriteContract } from "@wagmi/core";
import contractAbi from "../../data/contractABI.json";
import { TypeHash, errorType } from "../../types";
const { VITE_CONTRACT_ADDRESS } = import.meta.env;

const exit = async(): Promise<errorType | TypeHash> => {
  try {
    const config = await prepareWriteContract({
      address: VITE_CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: "exit",
    });
    const { hash } = await writeContract(config);
    return hash;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("🚀 ~ file: approveTransaction.ts:25 ~ approveTransaction ~ error:", error)
    return {error: error.message}
    }
};

export default exit;