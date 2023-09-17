import { parseEther } from "viem";
import {
  writeContract,
  prepareWriteContract,
  // waitForTransaction,
} from "@wagmi/core";
import contractAbi from "../../data/contractABI.json";
const { VITE_CONTRACT_ADDRESS } = import.meta.env;

type TypeHash = `0x${string}`;

const stakedTokens = async (
  amount: string
): Promise<undefined | TypeHash> => {
  try {
    const config = await prepareWriteContract({
      address: VITE_CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: "stake",
      args: [parseEther(amount)],
    });
    const { hash } = await writeContract(config);
    // await waitForTransaction({
    //   hash,
    // });
    // return true;
    return hash;
  } catch (error) {
    console.log(error);
    // return false;
   
  }
};

export default stakedTokens;
