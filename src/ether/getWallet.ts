import { ethers, Wallet } from "ethers";
import dotenv from "dotenv";
import { faucets } from "../config";
import { getCeloWallet } from "./getCeloWallet";
dotenv.config();

export const getWallet = async (chain: string) => {
    const chainId: number = faucets[chain].chainId;

    if (chain == "alfajores") {
        return await getCeloWallet();
    }

    const provider = new ethers.providers.AlchemyProvider(
        chainId,
        process.env.ALCHEMY_API_KEY!
    );

    return Promise.resolve(new Wallet(process.env.PRIVATE_KEY!, provider));
};
