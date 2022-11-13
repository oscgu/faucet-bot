import { Transaction, ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { erc20 } from "../abis/erc20";
import { faucets, Token } from "../config";
import { getWallet } from "./getWallet";

export const sendFunds = async (
    address: string,
    chain: string,
    tokenName: string
): Promise<{
    tx: Transaction | undefined;
    provider: ethers.providers.Provider | undefined;
}> => {
    const token: Token = faucets[chain].tokens[tokenName];
    const value = parseEther(token.amount);
    const wallet = await getWallet(chain);

    try {
        if (token.chainNative) {
            const tx = await wallet.sendTransaction({
                to: address,
                value
            });

            return { tx, provider: wallet.provider };
        }

        const erc20Contract = new ethers.Contract(
            token.contractAddress!,
            erc20,
            wallet
        );

        const tx = await erc20Contract.transfer(address, value);

        return { tx, provider: wallet.provider };
    } catch (error) {
        console.log(error);
        return { tx: undefined, provider: undefined };
    }
};
