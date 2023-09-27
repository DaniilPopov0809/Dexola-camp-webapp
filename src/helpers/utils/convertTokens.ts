import { formatEther } from "viem";
import { reduceDecimals } from ".";

const convertTokens = (tokens: bigint): string => {
  const formated = formatEther(tokens);
  return reduceDecimals(formated, 2);
};

export default convertTokens;
