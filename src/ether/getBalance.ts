import { ethers } from "ethers";
import { erc20 } from "../abis/erc20";
import { faucets } from "../config";
import { getWallet } from "./getWallet";

export const getBalance = async (chain: string, token: string) => {
    const wallet = await getWallet(chain);

    const faucetToken = faucets[chain].tokens[token];
    if (faucetToken.chainNative) {
        return await wallet.getBalance();
    }

    const ca = new ethers.Contract(faucetToken.contractAddress!, erc20, wallet);

    return await ca.balanceOf(wallet.address);
};
