import { waitForTransaction, getAccount } from "@wagmi/core";
import { TypeHash } from "../../types";

const waitForOperation = async (hash: TypeHash) => {
  try {
    const { isConnected } = getAccount();

    if (!isConnected) {
      throw new Error("Connect error!");
    }
    const data = await waitForTransaction({
      hash,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default waitForOperation;
