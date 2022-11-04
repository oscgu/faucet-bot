import { ethers, Wallet } from "ethers";
import { chainIds} from "../config";
import dotenv from "dotenv";
dotenv.config();

export const getWallet = (chain: string) => {
    const chainId = chainIds.get(chain)!;
    const provider = new ethers.providers.AlchemyProvider(chainId, process.env.ALCHEMY_API_KEY!);
    return new Wallet(process.env.PRIVATE_KEY!, provider);
}
