import { formatEther } from "viem";

const calculateStakeBalance = (balance:bigint):string => {
    const formatedBalabce = +formatEther(balance);
    return formatedBalabce.toFixed(2);
}

export default calculateStakeBalance;