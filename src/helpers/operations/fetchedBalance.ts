import { fetchBalance } from "@wagmi/core";
import { getAccount } from '@wagmi/core'

const { VITE_TOKEN_ADDRESS } = import.meta.env;

const fetchedBalance = async () => {

  try {
    const account = getAccount();

    if (!account || !account.address) {
        throw new Error("Account or address is undefined");
      }

    const address = account.address;
    const balance = await fetchBalance({
      address: address,
      token: VITE_TOKEN_ADDRESS,
    });
    return balance;
  } catch (error) {
    console.error(error);
  }
};

export default fetchedBalance;
