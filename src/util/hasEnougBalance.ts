import { BigNumber, ethers } from "ethers";
import { getBalance } from "../ether/getBalance";

export const hasEnoughBalance = async (
    chain: string,
    token: string,
    amount: string
) => {
    const bal: BigNumber = await getBalance(chain, token);
    console.log(
        `BalanceOf ${token} on ${chain}: ${ethers.utils.formatEther(
            bal
        )}\nRequested: ${ethers.utils.formatEther(
            ethers.utils.parseEther(amount)
        )}`
    );

    return bal.gte(ethers.utils.parseEther(amount));
};
