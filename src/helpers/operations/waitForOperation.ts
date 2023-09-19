import { waitForTransaction } from "@wagmi/core";
import { TypeHash } from "../../types";

const waitForOperation = async (hash: TypeHash) => {
  try {
    const data = await waitForTransaction({
      hash,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default waitForOperation;
