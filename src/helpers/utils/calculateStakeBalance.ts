import { formatEther } from "viem";
import { reduceDecimals } from ".";

const calculateStakeBalance = (balance:bigint):string => {
    return  reduceDecimals(formatEther(balance), 2);
}

export default calculateStakeBalance;