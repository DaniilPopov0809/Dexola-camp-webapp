import { getAccount } from '@wagmi/core';
import { readContract } from '@wagmi/core'
const {VITE_CONTRACT_ADDRESS} = import.meta.env;
import contractAbi from "../../data/contractABI.json";

const fetchedStakeBalance = async ():Promise<bigint|undefined> => {
  try {
    const {isConnected, address} = getAccount();

    if (!isConnected || !address) {
        throw new Error("Connect error!");
      }

    const data = await readContract({
      address: VITE_CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: 'balanceOf',
      args: [address],
    }) as bigint
   
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchedStakeBalance;
